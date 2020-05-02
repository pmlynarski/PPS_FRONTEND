import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { IUserData } from '../../../core/interfaces/user.interfaces';
import { PendingListService } from './pending-list.service';

@Component({
  selector: 'app-pending-list',
  templateUrl: './pending-list.component.html',
  styleUrls: ['./pending-list.component.css'],
})
export class PendingListComponent implements OnInit, OnDestroy {
  userList: IUserData[];
  subscription: Subscription;
  groupId: number;
  message: string;
  nextUrl: string;

  constructor(private pendingService: PendingListService, private route: ActivatedRoute) {
    this.groupId = parseInt(this.route.snapshot.paramMap.get('id'), 0);
    this.loadPendingUsers();
  }

  ngOnInit() {}

  loadPendingUsers() {
    this.subscription = this.pendingService.getPendingList(this.groupId).subscribe(
      (response) => {
        this.nextUrl = response.next;
        this.userList = response.results.map((element) => ({ ...element.user }));
      },
      (error) => {
        this.message = error.error.message;
        this.userList = [];
      },
    );
  }

  accept(id: number) {
    this.pendingService.acceptMember(this.groupId, id).subscribe((res) => {
      this.loadPendingUsers();
    });
  }

  decline(id: number) {
    this.pendingService.declineMember(this.groupId, id).subscribe((res) => {
      this.loadPendingUsers();
    });
  }

  @HostListener('window:scroll') onScrollEvent() {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      if (this.nextUrl !== null) {
        const sub = this.pendingService.getFurtherList(this.nextUrl).subscribe(
          (res: any) => {
            this.userList = [...this.userList, ...res.results];
            this.nextUrl = res.next;
            this.message = undefined;
          },
          (error) => {
            this.message = error.message;
          },
        );
        this.subscription.add(sub);
      }
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
