import { Component, HostListener } from '@angular/core';

import { IPost } from '../../core/interfaces/posts.interfaces';
import { AllPostsService } from './all_posts.service';

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.css'],
})
export class AllPostsComponent {
  private posts: IPost[];
  private nextUrl: string;
  private message: string;

  constructor(private allPostsService: AllPostsService) {
    this.allPostsService.getUsersPosts().subscribe(
      (response: any) => {
        this.message = undefined;
        this.posts = [...response.results];
        this.nextUrl = response.next;
      },
      (error) => {
        this.message = error.error.message;
      },
    );
  }

  @HostListener('window:scroll') onScrollEvent() {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      if (this.nextUrl !== null) {
        this.allPostsService.getFurtherPosts(this.nextUrl).subscribe(
          (res: any) => {
            this.posts = [...this.posts, ...res.results];
            this.nextUrl = res.next;
            this.message = undefined;
          },
          (error) => {
            this.message = error.message;
          },
        );
      }
    }
  }
}
