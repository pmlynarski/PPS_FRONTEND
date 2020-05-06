import { DOCUMENT } from '@angular/common';
import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { throwError } from 'rxjs';

import { IPost } from '../../core/interfaces/posts.interfaces';
import { PostDetailsService } from '../post-details/post-details.service';
import { ProfileService } from '../profile/profile.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  @Input() post: IPost;
  @Input() withGroup: boolean;
  @Output() refresh: EventEmitter<void>;
  isOwner: boolean;
  classObj: { active: boolean };
  postEditing: boolean;
  postDeleting: boolean;
  editForm: FormGroup;

  constructor(
    private profileService: ProfileService,
    @Inject(DOCUMENT) private document: Document,
    private postService: PostDetailsService,
  ) {
    this.refresh = new EventEmitter<void>();
    this.classObj = {
      active: false,
    };
    this.postEditing = false;
    this.postDeleting = false;
    this.editForm = new FormGroup({
      content: new FormControl('', Validators.required),
      file: new FormControl(),
    });
  }

  ngOnInit(): void {
    this.profileService.getUsersCredentials().subscribe(
      (res) => {
        this.isOwner = res.email === this.post.owner.email;
      },
      () => {
        this.isOwner = false;
      },
    );
  }

  get content() {
    return this.editForm.get('content');
  }

  get file() {
    return this.editForm.get('file');
  }

  get data() {
    const fd = new FormData();
    fd.append('content', this.content.value);
    if (this.file.value) {
      fd.append('file', this.file.value);
    }
    return fd;
  }

  editToggle() {
    this.content.setValue(this.post.content);
    this.postEditing = !this.postEditing;
  }

  submitEdit() {
    this.postService.editPost(this.post.id, this.data).subscribe(
      () => {
        this.postEditing = false;
        this.post.content = this.content.value;
        this.post.file = this.file.value;
      },
      (error) => throwError(error),
    );
  }

  toggleDeletePopup() {
    this.postDeleting = !this.postDeleting;
  }

  deletePost() {
    this.postService.deletePost(this.post.id).subscribe(() => {
      this.refresh.emit();
    });
  }
}
