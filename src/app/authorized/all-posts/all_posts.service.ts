import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { default as urlData } from 'src/app/config';

@Injectable()
export class AllPostsService {
    myPostsUrl = urlData.host + 'posts/my_posts/?page=1';
    constructor(private http: HttpClient) { }
    getUsersPosts() {
        return this.http.post(this.myPostsUrl, {}, { observe: 'response' });
    }
    getFurtherPosts(url: string) {
        return this.http.post(url, {}, { observe: 'response' });
    }
}
