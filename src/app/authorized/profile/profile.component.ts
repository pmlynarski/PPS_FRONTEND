import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { throwError } from 'rxjs';

import config, { default as configData } from 'src/app/core/config.js';
import { IUserData } from '../../core/interfaces/user.interfaces';
import { equalityValidator } from '../../homepage/register/equality.validator';
import { ProfileService } from './profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  private user: IUserData;
  private resultMessage: string;
  private firstNameField: boolean;
  private lastNameField: boolean;
  private emailField: boolean;
  private passwordChange: boolean;
  private changePasswordForm: FormGroup;
  private readonly regExp: string;
  private editImage: boolean;
  image: File;

  constructor(private profileService: ProfileService) {
    this.editImage = false;

    this.regExp = configData.passwordRegEx;
    this.getUserCredentials();
    this.changePasswordForm = new FormGroup({
      password: new FormControl('', [Validators.required, Validators.pattern(this.regExp), Validators.minLength(8)]),
      repeatPassword: new FormControl('', [Validators.required, equalityValidator('password')]),
    });
    this.firstNameField = false;
    this.lastNameField = false;
    this.emailField = false;
    this.passwordChange = false;
  }

  get password(): AbstractControl {
    return this.changePasswordForm.get('password');
  }

  get repeatPassword(): AbstractControl {
    return this.changePasswordForm.get('repeatPassword');
  }

  getUserCredentials(): void {
    this.profileService.getUsersCredentials().subscribe((response) => {
      this.user = response;
    });
  }

  editFirstName(): void {
    this.firstNameField = !this.firstNameField;
  }

  sendFirstName(): void {
    this.editFirstName();
    this.profileService.sendUserData({ first_name: this.user.first_name }).subscribe(
      () => {
        this.getUserCredentials();
      },
      () => {
        this.resultMessage = 'Something is wrong!';
      },
    );
  }

  editLastName(): void {
    this.lastNameField = !this.lastNameField;
  }

  sendLastName(): void {
    this.editLastName();
    this.profileService.sendUserData({ last_name: this.user.last_name }).subscribe(
      () => {
        this.getUserCredentials();
      },
      () => {
        this.resultMessage = 'Something is wrong!';
      },
    );
  }

  editEmail(): void {
    this.emailField = !this.emailField;
  }

  sendEmail(): void {
    this.editEmail();
    this.profileService.sendUserData({ email: this.user.email }).subscribe(
      () => {
        this.getUserCredentials();
      },
      () => {
        this.resultMessage = 'This email is already taken';
      },
    );
  }

  passwordFormReveal(): void {
    this.passwordChange =  !this.passwordChange;
  }

  submitPassword(): void {
    this.passwordFormReveal();
    this.profileService.sendUserData({ password: this.password.value }).subscribe(
      () => {
        this.getUserCredentials();
      },
      (error) => {
        throwError(error);
      },
    );
  }

  repairLinks = (images: string[]) => images.map(element => `${config.host}${element}`);

  onFileSelected(event){
    this.image = <File>event.srcElement.files[0];
  }

  sendImage(): void {
    const fd =  new FormData;
    fd.append('image', this.image, this.image.name)

    this.profileService.sendUserData(fd).subscribe(
      (response) => {
        this.getUserCredentials();
        this.showEditImage()
      },
      (event) => {
        this.resultMessage = 'Something is wrong!';
      },
    );
  }

  showEditImage(){
    this.editImage = !this.editImage;
  }

}
