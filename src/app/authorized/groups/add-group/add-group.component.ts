import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AddGroupService } from './add-group.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.css'],
})
export class AddGroupComponent implements OnInit {
  addGroupForm;
  constructor(private addGroupService: AddGroupService, private router: Router) {}

  ngOnInit() {
    this.addGroupForm = new FormGroup({});
    this.addGroupForm.addControl('groupName', new FormControl('', [Validators.required]));
  }
  get groupName() {
    return this.addGroupForm.get('groupName');
  }
  addGroup = () => {
    this.addGroupService.addGroup({ name: this.groupName.value }).subscribe(
      (response) => {
        this.router.navigate(['/home/groups']);
      },
      (error) => {},
    );
  };
}
