import { Component, OnInit } from '@angular/core';
import { ProfileService } from './profile.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { default as configData } from 'src/app/config.js';
import { throwError } from 'rxjs';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private profileService: ProfileService) { }
  rendered: boolean;
  data;
  user;
  resultMessage = '';
  firstNameField = false;
  lastNameField = false;
  emailField = false;
  passwordChange = false;
  changePasswordForm;
  regExp = configData.passwordRegEx;
  ngOnInit() {
    this.profileService.getUsersCredentials().subscribe(response => {
      if (response.status === 200) {
        this.rendered = true;
        this.user = response.body;
      }
    });
    this.changePasswordForm = new FormGroup({});
    this.changePasswordForm.addControl('password', new FormControl('',
      [Validators.required, Validators.pattern(this.regExp), Validators.minLength(8)]));
    this.changePasswordForm.addControl('repeatPassword', new FormControl('',
      [Validators.required, this.validateAreEqual.bind(this)]));
  }
  private validateAreEqual(fieldControl: FormControl) {
    return fieldControl.value === this.changePasswordForm.get('password').value ? null : {
      NotEqual: true
    };
  }
  get password() {
    return this.changePasswordForm.get('password');
  }
  get repeatPassword() {
    return this.changePasswordForm.get('repeatPassword');
  }
  editFirstName = () => {
    this.firstNameField = !this.firstNameField;
  }
  sendFirstName = () => {
    this.editFirstName();
    this.profileService.sendUserData({ first_name: this.user.first_name }).subscribe(response => {
      this.ngOnInit();
    }, error => {
      this.resultMessage = 'Something is wrong!';
    });
  }
  editLastName = () => {
    this.lastNameField = !this.lastNameField;
  }
  sendLastName = () => {
    this.editLastName();
    this.profileService.sendUserData({ last_name: this.user.last_name }).subscribe(response => {
      this.ngOnInit();
    }, error => {
      this.resultMessage = 'Something is wrong!';
    });
  }
  editEmail = () => {
    this.emailField = !this.emailField;
  }
  sendEmail = () => {
    this.editEmail();
    this.profileService.sendUserData({ email: this.user.email }).subscribe(response => {
      this.ngOnInit();
    }, error => {
      if (error.status === 406) {
        this.resultMessage = 'This email is already taken';
      } else {
        this.resultMessage = 'Something is wrong!';
      }
    });
  }
  passwordFormReveal = (value = true) => { this.passwordChange = value; };
  submitPassword = () => {
    this.passwordFormReveal(false);
    this.profileService.sendUserData({ password: this.password.value }).subscribe(response => {
      this.ngOnInit();
    }, error => {
      throwError(error);
    });
  }
}
