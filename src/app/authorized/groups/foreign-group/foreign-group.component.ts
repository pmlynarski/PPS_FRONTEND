import { Component, OnInit, ElementRef } from '@angular/core';
import { throwError } from 'rxjs';
import { ForeignGroupService } from './foreign-group.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ThrowStmt } from '@angular/compiler';


@Component({
  selector: 'app-foreign-group',
  templateUrl: './foreign-group.component.html',
  styleUrls: ['./foreign-group.component.css']
})
export class ForeignGroupComponent implements OnInit {
  group: any = {
    name: '',
    members_count: '',
    owner: {
      first_name: '',
      last_name: ''
    }
  };
  isMember = true;
  groupId;
  responseBody;
  confirmationVisible = false;
  constructor(private foreignGroupService: ForeignGroupService,
              private activatedRoute: ActivatedRoute, private router: Router,
              private elRef: ElementRef) { }

  ngOnInit() {
    this.groupId = this.activatedRoute.snapshot.paramMap.get('id');
    this.foreignGroupService.getGroupData(this.groupId).subscribe(response => {
      if (response.status === 200) {
        this.group = response.body;
        this.isMember = false;
      }
    }, error => {
      if (error.status === 406) {
        this.isMember = true;
        this.router.navigate(['/home/group', this.groupId]);
      } else {
        throwError(error);
      }
    });
  }
  /*
  showConfirmation = (value: boolean = true) => {
    this.confirmationVisible = value;
  }*/
  showConfirmation = (value: boolean = true) => {
    const box = this.elRef.nativeElement.querySelector('.confirmation');
    box.classList.toggle('confirmation--hidden');
  }
  joinGroup = () => {
    this.showConfirmation(false);
    this.foreignGroupService.joinGroup(this.groupId).subscribe(response => {
      this.group.info = response.body.info;
    }, error => {
      if (error.status === 406) {
        this.group.info = error.error.info;
        throwError(error);
      }
    });
  }

}
