import { Component, OnInit, Input } from '@angular/core';
import { Bill } from '../../shared/models/bill.model';

@Component({
  selector: 'sv-bill-card',
  templateUrl: './bill-card.component.html',
  styleUrls: ['./bill-card.component.scss']
})
export class BillCardComponent implements OnInit {

  @Input() bill:Bill;
  @Input() currency:any;

  dollar: number;
  foont: number;

  constructor() { }

  ngOnInit() {
  
    const{ rates } = this.currency;
    this.dollar = rates['USD'] * this.bill.value;
    this.foont = rates['GBP'] * this.bill.value;
  }

}
