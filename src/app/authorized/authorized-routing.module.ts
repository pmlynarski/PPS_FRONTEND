import { RouterModule, Routes } from '@angular/router';

import { HomeGuard } from '../core/home.guard';
import { AllPostsComponent } from './all-posts/all-posts.component';
import { AuthorizedComponent } from './authorized.component';
import { AddGroupComponent } from './groups/add-group/add-group.component';
import { ForeignGroupComponent } from './groups/foreign-group/foreign-group.component';
import { GroupsComponent } from './groups/groups.component';
import { SingleGroupComponent } from './groups/single-group/single-group.component';
import { ProfileComponent } from './profile/profile.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  {
    path: 'home',
    component: AuthorizedComponent,
    canActivate: [HomeGuard],
    children: [
      { path: 'posts', component: AllPostsComponent },
      { path: 'groups', component: GroupsComponent },
      { path: 'group/:id', component: SingleGroupComponent },
      { path: 'group/foreign/:id', component: ForeignGroupComponent },
      { path: 'search', component: SearchComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'groups/create', component: AddGroupComponent },
      { path: '', redirectTo: 'posts', pathMatch: 'full' },
    ],
  },
];

export const routing = RouterModule.forChild(routes);
