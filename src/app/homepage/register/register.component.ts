import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Validators, FormControl, FormGroup, AbstractControl, ValidatorFn } from '@angular/forms';
import { RegisterService } from './register.service';
import { default as configData } from 'src/app/config.js';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Input() hidden: boolean;
  @Output() setHidden = new EventEmitter<boolean>();
  @Output() showRegisterInfo = new EventEmitter<boolean>();
  public registerForm: FormGroup;
  userExists = false;
  userExistsError = 'User with this email already exists.';
  roleOptions = ['Lecturer', 'Student'];
  regExp = configData.passwordRegEx;
  constructor(public registerService: RegisterService) { }
  ngOnInit() {
    this.registerForm = new FormGroup({});
    this.registerForm.addControl('firstName', new FormControl('', [Validators.required, Validators.minLength(4)]));
    this.registerForm.addControl('lastName', new FormControl('', [Validators.required, Validators.minLength(4)]));
    this.registerForm.addControl('email', new FormControl('', [Validators.required, Validators.email]));
    this.registerForm.addControl('password', new FormControl('',
    [Validators.required, Validators.pattern(this.regExp), Validators.minLength(8)]));
    this.registerForm.addControl('repeatPassword', new FormControl('',
    [Validators.required, this.validateAreEqual.bind(this), Validators.minLength(8)]));
    this.registerForm.addControl('role', new FormControl('', []));

  }
  private validateAreEqual(fieldControl: FormControl) {
    return fieldControl.value === this.registerForm.get('password').value ? null : {
      NotEqual: true
    };
  }
  get firstName() {
    return this.registerForm.get('firstName');
  }
  get lastName() {
    return this.registerForm.get('lastName');
  }
  get email() {
    return this.registerForm.get('email');
  }
  get password() {
    return this.registerForm.get('password');
  }
  get repeatPassword() {
    return this.registerForm.get('repeatPassword');
  }
  get role() {
    return this.registerForm.get('role');
  }
  get data() {
    return {
      first_name: this.firstName.value,
      last_name: this.lastName.value,
      email: this.email.value,
      password: this.password.value,
      lecturer: this.role.value === 'Lecturer' ? true : false
    };
  }
  submitRegister() {
    this.registerService.registerUser(this.data).subscribe(
      response => {
        response.status === 201 ? this.userExists = false : this.userExists = true;
        this.showRegisterInfo.emit();
      },
      error => {
        error.status === 406 ? this.userExists = true : this.userExists = false;
      });
  }
}
