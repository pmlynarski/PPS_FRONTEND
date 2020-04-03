import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { LoginGuard } from './homepage/login/login.guard';
import { HomeGuard } from './home.guard';

const routes: Routes = [
  { path: '', component: HomepageComponent, canActivate: [LoginGuard] },
  { path: 'about', component: AboutusComponent },
  { path: 'home', loadChildren: () => import('./authorized/authorized.module')
  .then(mod => mod.AuthorizedModule), canActivate: [HomeGuard]}
];

export const routing = RouterModule.forRoot(routes);
