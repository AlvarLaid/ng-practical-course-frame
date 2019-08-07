import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from 'events';
import { FormBuilder, Validators, FormGroup, FormControl, AbstractControl, ValidatorFn } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { TodoApiInterceptor } from '../../../mock-api/interceptors/todo-api.interceptor';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  providers: [TodoApiInterceptor]
})
export class SignUpComponent implements OnInit {

  @Output() sigUpRequested: EventEmitter = new EventEmitter();

  signUpForm: FormGroup;

  constructor(fb: FormBuilder, private mockApi: TodoApiInterceptor) {
    this.signUpForm = fb.group({
      userName: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern('.*[0-9].*')]],
      verifyPassword: ['', [Validators.required, Validators.minLength(6), Validators.pattern('.*[0-9].*')]]
    }, {
      validator: this.passwordValidator
    });
  }

  ngOnInit() {
    this.searchUserName();
  }

  searchUserName() {
    this.signUpForm.get('userName').valueChanges.pipe(debounceTime(250))
    .subscribe(x => {
      this.mockApi.handleUsernameValidation(x).subscribe(result => {
        if (result.body.exists) {
          this.signUpForm.get('userName').setErrors({ userAlreadyExist: true });
        }
      });
    });
  }

  onSubmit() {
    if (this.signUpForm.valid) {
      console.log('Form submited.');
      this.sigUpRequested.emit('');
      return;
    }
    console.log('Form invalid');
  }

  passwordValidator(form: FormGroup) {

    const passwordMatch = form.get('password').value === form.get('verifyPassword').value;
    if (!passwordMatch) {
      form.get('verifyPassword').setErrors({ passwordsDoNotMatch: true });
    }
    else {
      form.get('verifyPassword').setErrors({ passwordsDoNotMatch: null });
    }

    return passwordMatch ? null : { passwordsDoNotMatch: true};
  }
}
