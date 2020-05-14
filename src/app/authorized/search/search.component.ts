import { Component, HostListener } from '@angular/core';

import { IGroupFull } from '../../core/interfaces/groups.interfaces';
import { SearchService } from './search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  private value: string;
  private results: IGroupFull[];
  private nextUrl: string;
  private message: string;

  constructor(private searchService: SearchService) {
    this.search();
  }

  search() {
    this.searchService.getResults(this.value).subscribe(
      (response) => {
        this.message = undefined;
        this.results = [...response.results];
        this.results = this.results.map(element => ({ ...element, membersCount: element.members.length }));
        this.nextUrl = response.next;

      },
      (error) => {
        this.results = [];
        this.message = error.error.message;
      },
    );
  }
  @HostListener('window:scroll') onScrollEvent() {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      if (this.nextUrl !== null) {
        this.searchService.getFurtherResults(this.nextUrl, this.value).subscribe(
          (response) => {
            this.message = undefined;
            this.results = this.results.concat(response.results);
            this.nextUrl = response.next;
          },
          (error) => {
            this.message = error.error.message;
          },
        );
      }
    }
  }
}
