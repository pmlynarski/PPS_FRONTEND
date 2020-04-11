import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { default as urlData } from '../../core/config';

@Injectable()
export class AllPostsService {
  private myPostsUrl: string;

  constructor(private http: HttpClient) {
    this.myPostsUrl = urlData.host + 'posts/my_posts/?page=1';
  }

  getUsersPosts(): Observable<HttpResponse<any>> {
    return this.http.post(this.myPostsUrl, {}).pipe(
      map((res: any) => {
        return {
          ...res,
          results: [...res.results].map((element) => ({ ...element, date_posted: new Date(element.date_posted).toLocaleString() })),
        };
      }),
    );
  }

  getFurtherPosts(url: string): Observable<HttpResponse<any>> {
    return this.http.post(url, {}).pipe(
      map((res: any) => {
        return {
          ...res,
          results: [...res.results].map((element) => ({ ...element, date_posted: new Date(element.date_posted).toLocaleString() })),
        };
      }),
    );
  }
}
