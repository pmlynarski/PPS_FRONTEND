import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { default as urlData } from 'src/app/core/config';

@Injectable()
export class SearchService {
    url = urlData.host + 'groups/search/?page=1';
    constructor(private http: HttpClient) { }

    getResults(phrase: string) {
        return this.http.post(this.url, {phrase: phrase}, { observe: 'response' });
    }
    getFurtherResults(url, phrase: string){
        return this.http.post(url, {phrase: phrase}, { observe: 'response' });

    }

}
