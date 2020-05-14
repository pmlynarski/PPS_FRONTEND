import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { default as urlData } from 'src/app/core/config';

@Injectable()
export class PostDetailsService {
  private readonly editPostUrl: string;
  private readonly deletePostUrl: string;

  constructor(private http: HttpClient) {
    this.editPostUrl = urlData.host + 'posts/edit/';
    this.deletePostUrl = urlData.host + 'posts/delete/';
  }

  getPostDetails: any = (id: number) => {
    const postDetailsUrl = urlData.host + `posts/post/${id}/`;
    return this.http.get(postDetailsUrl, { observe: 'response' });
  };

  addComment = (postID: number, data) => {
    const url = urlData.host + `posts/post/${postID}/comment/`;
    return this.http.post(url, data, { observe: 'response' });
  };

  editPost(postId: number, data) {
    return this.http.put(this.editPostUrl + postId + '/', data);
  }

  deletePost(postId: number) {
    return this.http.delete(this.deletePostUrl + postId + '/');
  }

  editComment(postId: number, commentId: number, data) {
    const url = urlData.host + `posts/post/${postId}/comment/${commentId}/edit/`;
    return this.http.put(url, data);
  }

  deleteComment(postId: number, commentId: number) {
    return this.http.delete(urlData.host + `posts/post/${postId}/comment/${commentId}/delete/`);
  }
}
