import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { throwError } from 'rxjs';

import { IGroupFull } from '../../../core/interfaces/groups.interfaces';
import { IPost } from '../../../core/interfaces/posts.interfaces';
import { SingleGroupService } from './single-group.service';
import { IUserData } from 'src/app/core/interfaces/user.interfaces';

@Component({
  selector: 'app-single-group',
  templateUrl: './single-group.component.html',
  styleUrls: ['./single-group.component.css'],
})
export class SingleGroupComponent implements OnInit {
  private message: string;
  private posts: IPost[];
  private group: IGroupFull;
  private groupId: number;
  private isGroupOwner: boolean;
  private postForm: FormGroup;
  private nextUrl: string;
  private addImage: boolean;
  private addFile: boolean;
  private showGroupMembers: boolean;
  private groupMembers: IUserData[];
  image: File;
  file: File;

  constructor(
    private singleGroupService: SingleGroupService,
    private activatedRoute: ActivatedRoute,
    private elRef: ElementRef,
    private router: Router,
  ) {
    this.showGroupMembers = false;
    this.addImage = false;
    this.addFile = false;
    this.isGroupOwner = false;
    this.postForm = new FormGroup({
      content: new FormControl('', Validators.required),
    });
    this.groupId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.singleGroupService.getGroupData(this.groupId).subscribe(
      (response) => {
        this.group = response;
      },
      () => {
        this.router.navigate(['/home/groups']);
      },
    );
    this.loadPosts();
    this.singleGroupService.isGroupOwner(this.groupId).subscribe(
      () => {
        this.isGroupOwner = true;
      },
      () => {
        this.isGroupOwner = false;
      },
    );
  }

  ngOnInit(): void {}

  get content() {
    return this.postForm.get('content');
  }

  loadPosts() {
    this.singleGroupService.getGroupPosts(this.groupId).subscribe(
      (response) => {
        this.posts = response.results;
        this.nextUrl = response.next;
      },
      (error) => {
        this.message = error.message;
      },
    );
  }

  showMembers(){
    this.showGroupMembers = !this.showGroupMembers;
    this.singleGroupService.getGropuMembers(this.groupId).subscribe(
      (response) => {
        this.groupMembers = response;
      },
      () => {

      }
    )
  }

  showAddImage() {
    this.addImage = !this.addImage;
  }

  showAddFile() {
    this.addFile = !this.addFile;
  }

  onImageSelected(event) {
    this.image = event.srcElement.files[0] as File;
  }

  onFileSelected(event) {
    this.file = event.srcElement.files[0] as File;
  }

  get data() {
    const fd = new FormData();
    if (this.file) {
      fd.append('file', this.file);
    }
    if (this.image) {
      fd.append('image', this.image);
    }
    fd.append('content', this.content.value);
    return fd;
  }

  addPost = (fd): void => {
    this.singleGroupService.addPost(this.groupId, fd).subscribe(
      (post: any) => {
        this.posts.unshift(post);
        this.postForm.reset();
      },
      (error) => {
        throwError(error);
      },
    );
  };

  leaveGroup = (id: number) => {
    this.showConfirmation();
    this.singleGroupService.leaveGroup(id).subscribe(
      () => {
        this.router.navigate(['/home/groups']);
      },
      (error) => {
        throwError(error);
      },
    );
  };

  showConfirmation = (): void => {
    const box = this.elRef.nativeElement.querySelector('.confirmation');
    box.classList.toggle('confirmation--hidden');
  };

  deleteGroup(id: number): void {
    this.singleGroupService.deleteGroup(id).subscribe(() => {
      this.showConfirmation();
      this.router.navigate(['/home/groups']);
    });
  }

  @HostListener('window:scroll') onScrollEvent(): void {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      if (this.nextUrl !== null) {
        this.singleGroupService.getFurtherGroupPosts(this.nextUrl).subscribe(
          (response: any) => {
            this.posts = [...this.posts, ...response.results];
          },
          () => {},
        );
      }
    }
  }
}
