import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css']
})
export class AboutusComponent implements OnInit {

  constructor() { }
  firstHeader = 'Who are we?';
  firstContent = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  Praesent in felis lacinia, tincidunt augue id, rhoncus mi. Maecenas feugiat interdum dolor,
  quis convallis urna posuere sed. Aenean turpis elit, rhoncus eu magna vel, vehicula bibendum metus.
  Sed mi massa, feugiat volutpat convallis non, cursus vitae odio.`;
  secondHeader = 'Where are we heading?';
  secondContent = `Suspendisse porttitor pharetra nunc quis pulvinar. Sed ac pharetra lectus.
  Aenean dictum ipsum sit amet egestas vehicula. Maecenas bibendum vehicula tortor, ac luctus
  libero fringilla et. Proin magna lacus, pulvinar vel consectetur et, placerat vitae diam.`;
  contactFirstHeader = 'Questions?';
  contactSecondHeader = 'Mail me!';
  contactEmail = 'hrworker@companyname.com';
  ngOnInit() {
  }

}
