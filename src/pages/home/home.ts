import {Component, OnInit} from '@angular/core';
import { NavController } from 'ionic-angular';
import {CalcPage} from "../calc/calc";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{

  pages: Array<{title: string, component: any}>;

  constructor(public nav: NavController) {
    this.pages = [
      { title: 'ТО за месяц', component: CalcPage }
    ];
  }

  ngOnInit(): void {

  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }
}
