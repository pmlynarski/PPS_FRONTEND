import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  name = 'GROUPER';
  subName = 'JOIN US';
  loginFormVisible = false;
  registerFormVisible = false;
  registerResultVisible = false;
  constructor() { }

  ngOnInit() {
  }
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
