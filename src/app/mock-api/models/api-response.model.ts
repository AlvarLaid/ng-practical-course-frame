import { User } from '../../auth/models/user.model';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ErrorResponse {
  errorMsg: string;
}

export interface UserValidation {
  exists: boolean;
}

/**
 * Here we keep a union type of all response bodies that we expect
 * our api to return. Add here if you create a new API endpoint that
 * returns a type that is not covered here
 */
export type ApiResponseBody = ErrorResponse | User | UserValidation;

/**
 * This is so that we can keep our ApiResponse generic.
 * Type T is just a convention.
 */
export type ApiResponse<T> = Observable<HttpResponse<T>>;
