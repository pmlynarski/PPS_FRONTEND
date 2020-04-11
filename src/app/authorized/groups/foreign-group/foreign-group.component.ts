import { Component, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { IGroupFull } from '../../../core/interfaces/groups.interfaces';
import { ForeignGroupService } from './foreign-group.service';

@Component({
  selector: 'app-foreign-group',
  templateUrl: './foreign-group.component.html',
  styleUrls: ['./foreign-group.component.css'],
})
export class ForeignGroupComponent {
  private group: IGroupFull;
  private isMember: boolean;
  private readonly groupId: number;
  private message: string;

  constructor(
    private foreignGroupService: ForeignGroupService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private elRef: ElementRef,
  ) {
    this.groupId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.foreignGroupService.getGroupData(this.groupId).subscribe(
      (response: IGroupFull) => {
        this.group = response;
        this.isMember = false;
      },
      (error) => {
        this.isMember = true;
        this.message = error.error.message;
        this.router.navigate(['/home/group', this.groupId]);
      },
    );
  }

  showConfirmation = () => {
    const box = this.elRef.nativeElement.querySelector('.confirmation');
    box.classList.toggle('confirmation--hidden');
  };

  joinGroup = () => {
    this.showConfirmation();
    this.foreignGroupService.joinGroup(this.groupId).subscribe(
      (response) => {
        this.message = response.message;
      },
      (error) => {
        this.message = error.error.message;
      },
    );
  };
}
