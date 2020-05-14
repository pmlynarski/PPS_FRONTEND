import { Component } from '@angular/core';
import { IGroupFull } from '../../core/interfaces/groups.interfaces';
import { GroupsService } from './groups.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css'],
})
export class GroupsComponent {
  message: string;
  groups: IGroupFull[];
  newGroupFormVisible: boolean;

  constructor(private groupsService: GroupsService) {
    this.loadGroups();
  }

  showNewGroupForm() {
    this.newGroupFormVisible = !this.newGroupFormVisible;
  }

  loadGroups() {
    this.groupsService.getUsersGroups().subscribe(
      (response: any) => {
        this.message = undefined;
        this.groups = response.results;
      },
      (error) => {
        this.message = error.error.message;
      },
    );
  }
}
