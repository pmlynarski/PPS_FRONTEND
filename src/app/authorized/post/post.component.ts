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

  constructor(
    private profileService: ProfileService,
    @Inject(DOCUMENT) private document: Document,
  ) {
    this.refresh = new EventEmitter<void>();
    this.classObj = {
      active: false,
    };
    this.postEditing = false;
    this.postDeleting = false;
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
}
