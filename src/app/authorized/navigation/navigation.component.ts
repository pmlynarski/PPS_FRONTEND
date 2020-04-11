import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/homepage/login/login.service';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnInit {
  constructor(private loginService: LoginService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {}
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
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('.nav');
    hamburger.classList.toggle('hamburger--active');
    nav.classList.toggle('nav--active');
  };
  logout() {
    this.loginService.logout();
    this.router.navigate(['']);
  }
}
