import { Component, OnInit, ElementRef } from '@angular/core';
import { SingleGroupService } from './single-group.service';
import { ParamMap, ActivatedRoute, Router } from '@angular/router';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-single-group',
  templateUrl: './single-group.component.html',
  styleUrls: ['./single-group.component.css']
})
export class SingleGroupComponent implements OnInit {
  postsErrors = [];
  posts = [];
  newPostContent = '';
  group: any = {
    name: '',
    members_count: '',
    owner: {
      first_name: '',
      last_name: ''
    }
  };
  groupId;
  responseBody;
  isGroupOwner = false;
  constructor(private singleGroupService: SingleGroupService, private activatedRoute: ActivatedRoute,
    private elRef: ElementRef, private router: Router) { }

  ngOnInit() {
    this.groupId = this.activatedRoute.snapshot.paramMap.get('id');
    this.singleGroupService.getGroupData(this.groupId).subscribe(response => {
      if (response.status === 200) {
        this.group = response.body;
      }
    }, error => {
      throwError(error);
    });
    this.singleGroupService.getGroupPosts(this.groupId).subscribe(response => {
      if (response.status === 200) {
        this.responseBody = response.body;
        this.posts = this.responseBody.results;
      }
    }, error => {
      throwError(error);
    });
    this.singleGroupService.isGroupOwner(this.groupId).subscribe(response => {
      this.isGroupOwner = true;
    }, error => {
      this.isGroupOwner = false;
    });
  }
  addPost = () => {
    this.singleGroupService.addPost(this.groupId, { content: this.newPostContent }).subscribe(response => {
      this.ngOnInit();
    }, error => {
      throwError(error);
    });
    this.newPostContent = '';
  }
  deleteGroup(id) {
    console.log(id);
  }
  leaveGroup = (id: number) => {
    this.showConfirmation(false);
    this.singleGroupService.leaveGroup(id).subscribe(response => {
      this.router.navigate(['/home/groups']);
      console.log(response.body);
    }, error => {
      throwError(error);
    });
  }
  showConfirmation = (value: boolean = true) => {
    const box = this.elRef.nativeElement.querySelector('.confirmation');
    box.classList.toggle('confirmation--hidden');
  }
}
