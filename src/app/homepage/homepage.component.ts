import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {
  name: string;
  subName: string;
  loginFormVisible: boolean;
  registerFormVisible: boolean;
  registerResultVisible: boolean;

  constructor() {
    this.name = 'GROUPER';
    this.subName = 'JOIN US';
    this.loginFormVisible = false;
    this.registerFormVisible = false;
    this.registerResultVisible = false;
  }

  ngOnInit() {}

  showLoginForm(value: boolean = true) {
    this.loginFormVisible = value;
    this.registerFormVisible = false;
    this.registerResultVisible = false;
  }

  showRegisterForm(value: boolean = true) {
    this.registerFormVisible = value;
    this.loginFormVisible = false;
    this.registerResultVisible = false;
  }

  showRegisterResult(value: boolean = true) {
    this.registerResultVisible = value;
    this.loginFormVisible = false;
    this.registerFormVisible = false;
  }
}
