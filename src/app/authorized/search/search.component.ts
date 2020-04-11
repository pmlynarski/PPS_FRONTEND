import { Component, OnInit, HostListener } from '@angular/core';
import { SearchService } from './search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  value = '';
  results = [];
  responseBody;
  nextUrl;
  errors = [];
  constructor(private searchService: SearchService) { }
  ngOnInit() {
  }

  search() {
    this.results = [];
    this.errors = [];
    this.searchService.getResults(this.value).subscribe(response => {
      if (response.status === 200) {
        this.responseBody = response.body;
        this.results = this.responseBody.results;
        this.nextUrl = this.responseBody.next;
      } else {
      }
    }, error => {
      this.errors = [error.error.message];
    });
  }
  @HostListener('window:scroll', ['$event']) onScrollEvent($event) {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      if (this.nextUrl !== 'null') {
        this.searchService.getFurtherResults(this.nextUrl, this.value).subscribe(response => {
          if (response.status === 200) {
            this.responseBody = response.body;
            this.results = this.results.concat(this.responseBody.results);
            this.nextUrl = this.responseBody.next;
          }
        }, error => {
          if (error.status === 406) {
            this.errors.push(error.error.message);
          }
        });
      }
    }
  }
}
