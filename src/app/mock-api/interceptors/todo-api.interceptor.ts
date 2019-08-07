import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User, UserCredentials } from '../../auth/models/user.model';
import { ApiRequest } from '../models/api-request.model';
import { UserValidation, ApiResponse, ApiResponseBody, ErrorResponse } from '../models/api-response.model';

/**
 * We essentially mock a server here. Every outgoing request is
 * intercepted and an appropriate response is returned
 */

@Injectable()
export class TodoApiInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: ApiRequest, next: HttpHandler): ApiResponse<ApiResponseBody> {
    return this.handleRequest(request);
  }

  handleRequest({body, url}: ApiRequest): ApiResponse<ApiResponseBody> {
    switch (url) {
      case environment.api.login: return this.handleLogin(body as UserCredentials);
      case environment.api.signup: return this.handleSignup(body as UserCredentials);
      case environment.api.validateUsername: return this.handleUsernameValidation(body as User);
      default: return this.handleUknown();
    }
  }

  handleLogin(body: UserCredentials): ApiResponse<User> {
    const authenticated: boolean = this.authenticateUser(body);
    const responseBody: User = authenticated ? {username: body.username} : null;
    const status = authenticated ? 200 : 403;
    return this.constructResponse<User>(responseBody, status);
  }

  handleSignup({username, password}: UserCredentials): ApiResponse<User> {
    localStorage.setItem(username, JSON.stringify({username, password}));
    return this.constructResponse({username});
  }

  handleUsernameValidation({username}): ApiResponse<UserValidation> {
    const exists: UserValidation = {exists: !!this.getUser(username)};
    return this.constructResponse<UserValidation>(exists);
  }

  handleUknown(): ApiResponse<ErrorResponse> {
    return this.constructResponse<ErrorResponse>({errorMsg: 'I don\'t know how to handle this'}, 400);
  }

  getUser(username: string): UserCredentials {
    return JSON.parse(localStorage.getItem(username));
  }

  authenticateUser({username, password}: UserCredentials): boolean {
    const user = this.getUser(username);
    return user ? user.password === password : null;
  }

  /**
   * Sinse we kept our API response generic we can generate different
   * types of responses. This is an example of how we could type
   * factory methods. We pass the type argument like this:
   * methodName<TypeWeWantToPass>() (like in calls above)
   */
  constructResponse<T>(body: T, status: number = 200): ApiResponse<T> {
    return of(new HttpResponse({body, status}));
  }
}
