import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IComment } from '../../core/interfaces/comment.interfaces';
import { PostDetailsService } from '../post-details/post-details.service';
import { ProfileService } from '../profile/profile.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
})
export class CommentComponent implements OnInit {
  @Input() comment: IComment;
  @Output() refresh: EventEmitter<any>;
  commentEditing: boolean;
  commentDeleting: boolean;
  file: File;
  editCommentForm: FormGroup;
  editable: boolean;

  constructor(private postService: PostDetailsService, private profileService: ProfileService) {
    this.commentEditing = false;
    this.commentDeleting = false;
    this.editCommentForm = new FormGroup({
      content: new FormControl('', Validators.required),
      file: new FormControl(null),
    });
    this.refresh = new EventEmitter<any>();
    this.editable = false;
  }

  ngOnInit() {
    this.profileService.getCurrentUser().subscribe((res) => (this.editable = this.comment.owner.id === res.id));
  }

  get content() {
    return this.editCommentForm.get('content');
  }

  get data() {
    const fd = new FormData();
    if (this.file) {
      fd.append('file', this.file);
    }
    fd.append('content', this.content.value);
    return fd;
  }

  editToggle() {
    this.editCommentForm.reset();
    this.commentEditing = !this.commentEditing;
  }

  toggleDeletePopup() {
    this.commentDeleting = !this.commentDeleting;
  }

  submitPostEdit() {
    this.postService.editComment(this.comment.post, this.comment.id, this.data).subscribe(
      () => {
        this.refresh.emit();
      },
      (error) => {
        console.log(error);
      },
    );
  }

  commentFileChange($event) {
    this.file = $event.target.files.item(0);
  }

  deletePost() {
    this.postService.deleteComment(this.comment.post, this.comment.id).subscribe(() => this.refresh.emit());
  }
}
