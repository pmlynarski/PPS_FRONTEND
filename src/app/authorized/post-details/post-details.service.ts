import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { default as urlData } from 'src/app/core/config';


@Injectable()
export class PostDetailsService {
  private readonly editPostUrl: string;
  private postID: number;


  constructor(private http: HttpClient) { 
    this.editPostUrl = urlData.host + 'users/update';
  }

  getPostDetails: any = (id: number) =>{
    const postDetailsUrl = urlData.host + `posts/post/${id}/`;
    return this.http.get(postDetailsUrl, { observe: 'response' });
}

addComment = (postID: number, data) => {
  const url = urlData.host + `posts/post/${postID}/comment/`;
  return this.http.post(url, data, { observe: 'response' })
}


}
