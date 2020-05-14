import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AddGroupService } from './add-group.service';

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.css'],
})
export class AddGroupComponent {
  private addGroupForm: FormGroup;
  private message: string;
  @Output() setHidden: EventEmitter<boolean>;
  @Output() refresh: EventEmitter<any>;

  constructor(private addGroupService: AddGroupService) {
    this.setHidden = new EventEmitter<boolean>();
    this.refresh = new EventEmitter<any>();
    this.addGroupForm = new FormGroup({
      groupName: new FormControl('', [Validators.required]),
    });
  }

  get groupName() {
    return this.addGroupForm.get('groupName');
  }

  addGroup = (): void => {
    this.addGroupService.addGroup({ name: this.groupName.value }).subscribe(
      () => {
        this.message = undefined;
        this.setHidden.emit();
        this.refresh.emit();
      },
      (error) => {
        this.message = error.message;
      },
    );
  };
}
