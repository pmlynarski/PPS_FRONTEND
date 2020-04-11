import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AddGroupService } from './add-group.service';

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.css'],
})
export class AddGroupComponent {
  private addGroupForm: FormGroup;
  private message: string;

  constructor(private addGroupService: AddGroupService, private router: Router) {
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
        this.router.navigate(['/home/groups']);
      },
      (error) => {
        this.message = error.message;
      },
    );
  };
}
