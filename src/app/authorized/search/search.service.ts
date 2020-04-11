import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { default as urlData } from 'src/app/core/config';

@Injectable()
export class SearchService {
  private readonly url: string;

  constructor(private http: HttpClient) {
    this.url = urlData.host + 'groups/search/?page=1';
  }

  getResults(phrase: string): Observable<any> {
    return this.http
      .post<any>(this.url, { phrase })
      .pipe(
        map((response: any) => ({
          ...response,
          results: [...response.results].map((element) => ({ ...element, membersCount: element.length })),
        })),
      );
  }

  getFurtherResults(url, phrase: string): Observable<any> {
    return this.http.post(url, { phrase }).pipe(
      map((response: any) => ({
        ...response,
        results: [...response.results].map((element) => ({ ...element, membersCount: element.length })),
      })),
    );
  }
}
