import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-register-result',
  templateUrl: './register-result.component.html',
  styleUrls: ['./register-result.component.css'],
})
export class RegisterResultComponent {
  @Output() hideRegisterInfo: EventEmitter<boolean>;
  
  constructor() {
    this.hideRegisterInfo = new EventEmitter<boolean>();

  }
}
