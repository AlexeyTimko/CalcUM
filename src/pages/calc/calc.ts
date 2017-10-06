import {Component, OnInit} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

@Component({
  selector: 'page-calc',
  templateUrl: 'calc.html'
})
export class CalcPage implements OnInit {
  fact = {
    name: 'Факт',
    days: {
      value: null,
      active: false
    },
    amount: {
      value: null,
      active: false
    },
    kpc: {
      value: null,
      active: false
    },
    aveCheck: {
      value: null,
      active: false
    },
    checks: {
      value: null,
      active: false
    }
  };
  plan = {
    name: 'План',
    days: {
      value: null,
      active: false
    },
    amount: {
      value: null,
      active: false
    },
    kpc: {
      value: null,
      active: false
    },
    aveCheck: {
      value: null,
      active: false
    },
    checks: {
      value: null,
      active: false
    }
  };
  planPercent = {
    name: 'Выполнение',
    amount: {
      value: null,
      active: false
    },
    kpc: {
      value: null,
      active: false
    },
    aveCheck: {
      value: null,
      active: false
    },
    checks: {
      value: null,
      active: false
    }
  };
  prediction = {
    name: 'Прогноз',
    amount: {
      value: null,
      active: false
    },
    kpc: {
      value: null,
      active: false
    },
    aveCheck: {
      value: null,
      active: false
    },
    checks: {
      value: null,
      active: false
    }
  };

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  static daysInThisMonth(): any {
    let now = new Date();
    return {
      total: new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate(),
      today: now.getDate()
    };
  }

  ngOnInit(): void {
    this.plan.days.value = CalcPage.daysInThisMonth().total;
    this.fact.days.value = CalcPage.daysInThisMonth().today;
  }

  calculate(param): void {
    if(param != 'days'){
      this.planPercent[param].value = this.fact[param].value / this.plan[param].value * 100;
      if (this.plan.days.value > 0 && this.fact.days.value > 0) {
        this.prediction[param].value = this.fact[param].value / (this.plan.amount.value / this.plan.days.value * this.fact.days.value) * 100;
      }
    }
  }

  calculateRow(row, param): void {
    switch (param) {
      case 'days':
        this.fieldChange(row, 'amount', true);
        break;
      case 'amount':
        if (this[row].checks.value > 0) {
          this[row].aveCheck.value = this[row].amount.value / this[row].checks.value;
          this.fieldChange(row, 'aveCheck', true);
        } else if (this[row].aveCheck.value > 0) {
          this[row].checks.value = this[row].amount.value / this[row].aveCheck.value;
          this.fieldChange(row, 'checks', true);
        }
        break;
      case 'aveCheck':
        if (this[row].amount.value > 0) {
          this[row].checks.value = this[row].amount.value / this[row].aveCheck.value;
          this.fieldChange(row, 'checks', true);
        } else if (this[row].checks.value > 0) {
          this[row].amount.value = this[row].checks.value * this[row].aveCheck.value;
          this.fieldChange(row, 'amount', true);
        }
        break;
      case 'checks':
        if (this[row].amount.value > 0) {
          this[row].aveCheck.value = this[row].amount.value / this[row].checks.value;
          this.fieldChange(row, 'aveCheck', true);
        } else if (this[row].aveCheck.value > 0) {
          this[row].amount.value = this[row].checks.value * this[row].aveCheck.value;
          this.fieldChange(row, 'amount', true);
        }
        break;
    }
  }

  fieldChange(row, param, triggered = false): void {
    if (this[row][param].value > 0) {
      this.calculate(param);
    }
    if (!triggered) {
      this.calculateRow(row, param);
    }
  }

  fieldOnBlur(row, param): void {
    if (this[row][param].value == '') {
      this[row][param].value = null;
    }
    this[row][param].active = false;
    this.fieldChange(row, param);
  }
}
