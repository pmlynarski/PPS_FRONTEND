import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ILoginData } from '../../core/interfaces/user.interfaces';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  @Input() hidden: boolean;
  @Output() setHidden: EventEmitter<boolean>;
  private loginForm: FormGroup;
  private message: string;

  constructor(private loginService: LoginService, private router: Router) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
    this.setHidden = new EventEmitter<boolean>();
  }

  get email(): AbstractControl {
    return this.loginForm.get('email');
  }

  get password(): AbstractControl {
    return this.loginForm.get('password');
  }

  get data(): ILoginData {
    return {
      username: this.email.value,
      password: this.password.value,
    };
  }

  submitLogin(): void {
    this.loginService.login(this.data).subscribe(
      () => {
        this.message = undefined;
        this.router.navigate(['/home']);
      },
      () => {
        this.message = 'Wrong login credentials provided';
      },
    );
  }
}
