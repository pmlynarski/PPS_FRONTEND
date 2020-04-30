import { Component } from '@angular/core';
import { IGroupFull } from '../../core/interfaces/groups.interfaces';
import { GroupsService } from './groups.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css'],
})
export class GroupsComponent {
  private message: string;
  private groups: IGroupFull[];
  newGroupFormVisible: boolean;


  constructor(private groupsService: GroupsService) {
    this.groupsService.getUsersGroups().subscribe(
      (response: any) => {
        this.message = undefined;
        this.groups = response.results;
        console.log(response)
      },
      (error) => {
        this.message = error.error.message;
      },
    );
  }

  showNewGroupForm(){
    this.newGroupFormVisible = !this.newGroupFormVisible;
  }
}
