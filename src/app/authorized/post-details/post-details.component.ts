import { Component, OnInit } from '@angular/core';
import { PostDetailsService } from './post-details.service';
import { IPost } from '../../core/interfaces/posts.interfaces';
import { ActivatedRoute } from '@angular/router';
import { IComment } from '../../core/interfaces/comment.interfaces';
import { throwError, Observable } from 'rxjs';
import { throwIfEmpty, finalize } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css'],
})
export class PostDetailsComponent implements OnInit {
  private post: IPost;
  private postID: number;
  private comments: IComment[];
  private commentForm: FormGroup;
  file: File;

  constructor(private postDetailsServer: PostDetailsService, private activatedRoute: ActivatedRoute) {
    this.postID = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.postDetails(this.postID);
    this.commentForm = new FormGroup({
      content: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {}

  onFileSelected(event) {
    this.file = <File>event.srcElement.files[0];
  }

  get content() {
    return this.commentForm.get('content');
  }

  get data() {
    const fd = new FormData();
    fd.append('file', this.file, this.file.name);
    fd.append('content', this.content.value);
    return fd;
  }

  postDetails(id): void {
    this.postDetailsServer.getPostDetails(id).subscribe(
      (response) => {
        this.post = response.body['post'];
        this.comments = response.body['comments'];
      },
      () => {
        this.comments = [];
      },
    );
  }

  addComment(): void {
    this.postDetailsServer.addComment(this.postID, this.data).subscribe(
      (res) => {
        this.postDetails(this.postID);
        this.commentForm.reset();
      },
      () => {
      },
    );
  }
}
