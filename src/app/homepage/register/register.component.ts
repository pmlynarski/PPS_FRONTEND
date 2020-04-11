import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

import { default as configData } from 'src/app/core/config.js';
import { IRegisterData } from '../../core/interfaces/user.interfaces';
import { equalityValidator } from './equality.validator';
import { RegisterService } from './register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  @Input() hidden: boolean;
  @Output() setHidden: EventEmitter<boolean>;
  @Output() showRegisterInfo: EventEmitter<boolean>;
  private registerForm: FormGroup;
  private readonly regExp: string;
  private message: string;

  constructor(public registerService: RegisterService) {
    this.setHidden = new EventEmitter<boolean>();
    this.showRegisterInfo = new EventEmitter<boolean>();
    this.regExp = configData.passwordRegEx;
    this.registerForm = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.minLength(4)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(4)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.pattern(this.regExp), Validators.minLength(8)]),
      repeatPassword: new FormControl('', [Validators.required, equalityValidator('password'), Validators.minLength(8)]),
    });
  }

  get firstName(): AbstractControl {
    return this.registerForm.get('firstName');
  }

  get lastName(): AbstractControl {
    return this.registerForm.get('lastName');
  }

  get email(): AbstractControl {
    return this.registerForm.get('email');
  }

  get password(): AbstractControl {
    return this.registerForm.get('password');
  }

  get repeatPassword(): AbstractControl {
    return this.registerForm.get('repeatPassword');
  }

  get data(): IRegisterData {
    return {
      first_name: this.firstName.value,
      last_name: this.lastName.value,
      email: this.email.value,
      password: this.password.value,
    };
  }

  submitRegister(): void {
    this.registerService.registerUser(this.data).subscribe(
      () => {
        this.message = undefined;
        this.showRegisterInfo.emit();
      },
      () => {
        this.message = 'Provided email is already taken';
      },
    );
  }
}
