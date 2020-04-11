import { Routes, RouterModule } from '@angular/router';
import { AllPostsComponent } from './all-posts/all-posts.component';
import { AuthorizedComponent } from './authorized.component';
import { GroupsComponent } from './groups/groups.component';
import { SearchComponent } from './search/search.component';
import { ProfileComponent } from './profile/profile.component';
import { SingleGroupComponent } from './groups/single-group/single-group.component';
import { ForeignGroupComponent } from './groups/foreign-group/foreign-group.component';
import { AddGroupComponent } from './groups/add-group/add-group.component';


const routes: Routes = [
    {
        path: 'home', component: AuthorizedComponent,
        children: [
            { path: 'posts', component: AllPostsComponent },
            { path: 'groups', component: GroupsComponent },
            { path: 'groups/add', component: AddGroupComponent },
            { path: 'group/:id', component: SingleGroupComponent },
            { path: 'group/foreign/:id', component: ForeignGroupComponent },
            { path: 'search', component: SearchComponent },
            { path: 'profile', component: ProfileComponent },
            { path: 'groups/create', component: AddGroupComponent },
            { path: '', redirectTo: 'posts', pathMatch: 'full' },
        ]
    }
];

export const routing = RouterModule.forChild(routes);
