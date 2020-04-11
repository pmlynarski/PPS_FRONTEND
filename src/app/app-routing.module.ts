import { RouterModule, Routes } from '@angular/router';

import { AboutusComponent } from './aboutus/aboutus.component';
import { HomeGuard } from './core/home.guard';
import { LoginGuard } from './core/login.guard';
import { HomepageComponent } from './homepage/homepage.component';

const routes: Routes = [
  { path: '', component: HomepageComponent, canActivate: [LoginGuard] },
  { path: 'about', component: AboutusComponent },
  {
    path: 'home',
    loadChildren: () => import('./authorized/authorized.module').then((mod) => mod.AuthorizedModule),
    canActivate: [HomeGuard],
  },
];

export const routing = RouterModule.forRoot(routes);
