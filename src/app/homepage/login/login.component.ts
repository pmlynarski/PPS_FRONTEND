import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { default as configData } from 'src/app/config';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { LoginService } from 'src/app/homepage/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Input() hidden: boolean;
  @Output() setHidden = new EventEmitter<boolean>();
  passwordRegex = configData.passwordRegEx;
  wrongCredentials = false;
  public loginForm: FormGroup;
  constructor(public loginService: LoginService, private router: Router, private route: ActivatedRoute) {
    this.loginForm = new FormGroup({});
    this.loginForm.addControl('email', new FormControl('', [Validators.email, Validators.required]));
    this.loginForm.addControl('password', new FormControl('', [Validators.required]));
  }

  ngOnInit() {
  }
  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }
  get data() {
    return {
      username: this.email.value,
      password: this.password.value
    };
  }
  submitLogin() {
    this.loginService.login(this.data).subscribe(response => {
      if (response === true) {
        this.wrongCredentials = false;
        this.router.navigate(['/home']);
      } else {
        this.wrongCredentials = true;
      }
    },
      error => {
        this.wrongCredentials = true;
      }
    );
  }
}
