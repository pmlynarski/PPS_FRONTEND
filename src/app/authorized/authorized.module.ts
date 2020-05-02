import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HomeGuard } from '../core/home.guard';
import { TokenInterceptor } from '../core/token.interceptor';
import { AllPostsComponent } from './all-posts/all-posts.component';
import { AllPostsService } from './all-posts/all_posts.service';
import { routing } from './authorized-routing.module';
import { AuthorizedComponent } from './authorized.component';
import { AddGroupComponent } from './groups/add-group/add-group.component';
import { ForeignGroupComponent } from './groups/foreign-group/foreign-group.component';
import { ForeignGroupService } from './groups/foreign-group/foreign-group.service';
import { GroupsComponent } from './groups/groups.component';
import { GroupsService } from './groups/groups.service';
import { SingleGroupComponent } from './groups/single-group/single-group.component';
import { NavigationComponent } from './navigation/navigation.component';
import { PostComponent } from './post/post.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileService } from './profile/profile.service';
import { SearchComponent } from './search/search.component';
import { SearchService } from './search/search.service';
import { PendingListComponent } from './groups/pending-list/pending-list.component';
import { PostDetailsComponent } from './post-details/post-details.component';


@NgModule({
  declarations: [
    AllPostsComponent,
    AuthorizedComponent,
    NavigationComponent,
    GroupsComponent,
    SearchComponent,
    ProfileComponent,
    SingleGroupComponent,
    ForeignGroupComponent,
    AddGroupComponent,
    PostComponent,
    PendingListComponent,
    PostDetailsComponent,
  ],
  imports: [CommonModule, RouterModule, routing, FormsModule, ReactiveFormsModule],
  exports: [AuthorizedComponent],
  providers: [
    HomeGuard,
    AllPostsService,
    GroupsService,
    SearchService,
    ProfileService,
    ForeignGroupService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
})
export class AuthorizedModule {}
