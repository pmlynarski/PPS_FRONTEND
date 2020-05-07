import { DOCUMENT } from '@angular/common';
import { Component, EventEmitter, HostListener, Inject, Input, OnInit, Output } from '@angular/core';
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
  file: File;
  image: File;

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
      file: new FormControl(null),
      image: new FormControl(null),
    });
  }

  ngOnInit(): void {
    this.profileService.getCurrentUser().subscribe(
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

  get data() {
    const fd = new FormData();
    fd.append('content', this.content.value);
    if (this.file) {
      fd.append('file', this.file);
    }
    if (this.image) {
      fd.append('image', this.image);
    }
    return fd;
  }

  fileChange($event) {
    this.file = $event.target.files.item(0);
  }

  imageChange($event) {
    this.image = $event.target.files.item(0);
  }

  editToggle() {
    this.content.setValue(this.post.content);
    this.postEditing = !this.postEditing;
  }

  submitEdit() {
    this.postService.editPost(this.post.id, this.data).subscribe(
      (res) => {
        this.postEditing = false;
        this.post.content = this.content.value;
        this.post.file = this.file;
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
