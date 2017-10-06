import {Component, OnInit} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

@Component({
  selector: 'page-lforl',
  templateUrl: 'lforl.html'
})
export class LforlPage implements OnInit {

  prev = {
    name: 'ТО за предыдущий период',
    value: null,
    active: false
  };
  current = {
    name: 'ТО за текущий период',
    value: null,
    active: false
  };
  delta = {
    name: 'ΔТО',
    value: null,
    active: false
  };

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  ngOnInit(): void {

  }

  fieldChange(row): void {
    switch (row) {
      case 'prev':
        if (this.current.value > 0) {
          this.delta.value = Math.round((this.current.value / this.prev.value - 1) * 100 * 100 / 100);
        }else if(this.delta.value > 0){
          this.current.value = Math.round((this.delta.value / 100 + 1) * this.prev.value * 100 / 100);
        }
        break;
      case 'current':
        if (this.prev.value > 0) {
          this.delta.value = Math.round((this.current.value / this.prev.value - 1) * 100 * 100 / 100);
        } else {
          this.delta.value = null;
        }
        break;
      case 'delta':
        if (this.prev.value > 0) {
          this.current.value = Math.round((this.delta.value / 100 + 1) * this.prev.value * 100 / 100);
        }
        break;
    }
  }

  fieldOnBlur(row): void {
    if (this[row].value == '') {
      this[row].value = null;
    }
    this[row].active = false;
    this.fieldChange(row);
  }
}
