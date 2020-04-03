import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-register-result',
  templateUrl: './register-result.component.html',
  styleUrls: ['./register-result.component.css']
})
export class RegisterResultComponent implements OnInit {
  @Output() hideRegisterInfo = new EventEmitter<boolean>();
  header = 'Congratulations!';
  content = 'You have successfully created you account! You can log in now.';
  constructor() { }

  ngOnInit() {
  }

}
