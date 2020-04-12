import { RouterModule, Routes } from '@angular/router';

import { AboutusComponent } from './aboutus/aboutus.component';
import { LoginGuard } from './core/login.guard';
import { HomepageComponent } from './homepage/homepage.component';

const routes: Routes = [
  { path: '', component: HomepageComponent, canActivate: [LoginGuard] },
  { path: 'about', component: AboutusComponent },
];

export const routing = RouterModule.forRoot(routes);
