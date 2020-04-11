import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/homepage/login/login.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent {
  constructor(
    private loginService: LoginService,
    private router: Router,
    private route: ActivatedRoute,
    @Inject(DOCUMENT) private document: Document,
  ) {}

  navigateToPosts() {
    this.changeHamburgerState();
    this.router.navigate(['posts'], { relativeTo: this.route });
  }

  navigateToGroups = () => {
    this.changeHamburgerState();
    this.router.navigate(['groups'], { relativeTo: this.route });
  };

  navigateToSearch() {
    this.changeHamburgerState();
    this.router.navigate(['search'], { relativeTo: this.route });
  }

  navigateToProfile() {
    this.changeHamburgerState();
    this.router.navigate(['profile'], { relativeTo: this.route });
  }

  changeHamburgerState = () => {
    const hamburger = this.document.querySelector('.hamburger');
    const nav = this.document.querySelector('.nav');
    hamburger.classList.toggle('hamburger--active');
    nav.classList.toggle('nav--active');
  };

  logout() {
    this.loginService.logout();
    this.router.navigate(['']);
  }
}
