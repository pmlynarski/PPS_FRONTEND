import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { throwError } from 'rxjs';
import { IComment } from '../../core/interfaces/comment.interfaces';
import { IPost } from '../../core/interfaces/posts.interfaces';
import { ProfileService } from '../profile/profile.service';
import { PostDetailsService } from './post-details.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css'],
})
export class PostDetailsComponent implements OnInit {
  post: IPost;
  private readonly postID: number;
  comments: IComment[];
  commentForm: FormGroup;
  editPostForm: FormGroup;
  file: File;
  postFile: File;
  postImage: File;
  postEditing: boolean;
  postDeleting: boolean;
  editable: boolean;

  constructor(
    private postDetailsServer: PostDetailsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private profileService: ProfileService,
  ) {
    this.postEditing = false;
    this.postDeleting = false;
    this.postID = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.commentForm = new FormGroup({
      content: new FormControl('', Validators.required),
    });
    this.postDetails(this.postID);
    this.editPostForm = new FormGroup({
      content: new FormControl('', Validators.required),
      file: new FormControl(null),
      image: new FormControl(null),
    });
    this.editable = false;
  }

  ngOnInit() {}

  get postContent() {
    return this.editPostForm.get('content');
  }

  get postData() {
    const fd = new FormData();
    fd.append('content', this.postContent.value);
    if (this.postFile) {
      fd.append('file', this.postFile);
    }
    if (this.postImage) {
      fd.append('image', this.postImage);
    }
    return fd;
  }

  postFileChange($event) {
    this.postFile = $event.target.files.item(0);
  }

  postImageChange($event) {
    this.postImage = $event.target.files.item(0);
  }

  editToggle() {
    this.content.setValue(this.post.content);
    this.postEditing = !this.postEditing;
  }

  submitPostEdit() {
    this.postDetailsServer.editPost(this.post.id, this.postData).subscribe(
      () => {
        this.postEditing = false;
        this.postDetails(this.postID);
      },
      (error) => throwError(error),
    );
  }

  toggleDeletePopup() {
    this.postDeleting = !this.postDeleting;
  }

  deletePost() {
    this.postDetailsServer.deletePost(this.post.id).subscribe(() => {
      this.router.navigate(['/home/groups']);
    });
  }

  onFileSelected(event) {
    this.file = event.target.files.item(0) as File;
  }

  get content() {
    return this.commentForm.get('content');
  }

  get data() {
    const fd = new FormData();
    if (this.file) {
      fd.append('file', this.file);
    }
    fd.append('content', this.content.value);
    return fd;
  }

  postDetails(id): void {
    this.postDetailsServer.getPostDetails(id).subscribe(
      (response) => {
        this.post = response.body.post;
        this.comments = response.body.comments;
        this.profileService.getCurrentUser().subscribe((res) => (this.editable = this.post.owner.id === res.id));
        this.postContent.setValue(this.post.content);
      },
      () => {
        this.comments = [];
      },
    );
  }

  addComment(): void {
    this.postDetailsServer.addComment(this.postID, this.data).subscribe(
      () => {
        this.postDetails(this.postID);
        this.commentForm.reset();
      },
      () => {},
    );
  }
}
