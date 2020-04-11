import { Component, ElementRef, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { throwError } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { SingleGroupService } from './single-group.service';

@Component({
  selector: 'app-single-group',
  templateUrl: './single-group.component.html',
  styleUrls: ['./single-group.component.css'],
})
export class SingleGroupComponent implements OnInit {
  postsErrors = [];
  posts = [];
  newPostContent = '';
  group: any = {
    name: '',
    members: '',
    owner: {
      first_name: '',
      last_name: '',
    },
  };
  groupId;
  responseBody;
  isGroupOwner = false;
  postForm: FormGroup;

  constructor(
    private singleGroupService: SingleGroupService,
    private activatedRoute: ActivatedRoute,
    private elRef: ElementRef,
    private router: Router,
  ) {
    this.postForm = new FormGroup({
      content: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
    this.groupId = this.activatedRoute.snapshot.paramMap.get('id');
    this.singleGroupService.getGroupData(this.groupId).subscribe(
      (response) => {
        if (response.status === 200) {
          this.group = response.body;
          this.group.members = this.group.members.length;
        }
      },
      (error) => {
        throwError(error);
      },
    );
    this.singleGroupService.getGroupPosts(this.groupId).subscribe(
      (response) => {
        if (response.status === 200) {
          this.responseBody = response.body;
          this.posts = this.responseBody.results;
          this.posts = this.posts.map((element) => ({ ...element, date_posted: new Date(element.date_posted).toLocaleString() }));
        }
      },
      (error) => {
        this.postsErrors.push(error.message);
        throwError(error);
      },
    );
    this.singleGroupService.isGroupOwner(this.groupId).subscribe(
      (response) => {
        this.isGroupOwner = true;
      },
      (error) => {
        this.isGroupOwner = false;
      },
    );
  }

  get content() {
    return this.postForm.get('content');
  }

  addPost = () => {
    this.singleGroupService
      .addPost(this.groupId, { content: this.content.value })
      .pipe(
        finalize(() => {
          this.postForm.reset();
        }),
      )
      .subscribe(
        (response) => {
          this.ngOnInit();
        },
        (error) => {
          throwError(error);
        },
      );
  };

  leaveGroup = (id: number) => {
    this.showConfirmation(false);
    this.singleGroupService.leaveGroup(id).subscribe(
      (response) => {
        this.router.navigate(['/home/groups']);
      },
      (error) => {
        throwError(error);
      },
    );
  };
  showConfirmation = (value: boolean = true) => {
    const box = this.elRef.nativeElement.querySelector('.confirmation');
    box.classList.toggle('confirmation--hidden');
  };

  deleteGroup(id) {
    this.singleGroupService.deleteGroup(id).subscribe((res) => {
      this.showConfirmation(false);
      this.router.navigate(['/home/groups']);
    });
  }
}
