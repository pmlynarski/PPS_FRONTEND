import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { default as urlData } from 'src/app/config';

@Injectable()
export class GroupsService {
    myPostsUrl = urlData.host + 'groups/my_groups/?page=1';
    isLecturerUrl = urlData.host + 'users/is_lecturer/'
    constructor(private http: HttpClient) { }
    getUsersGroups() {
        return this.http.get(this.myPostsUrl, { observe: 'response' });
    }
    isLecturer = () => this.http.get(this.isLecturerUrl, {observe: 'response'});

}
