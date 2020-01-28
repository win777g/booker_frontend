import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'sv-currency-card',
  templateUrl: './currency-card.component.html',
  styleUrls: ['./currency-card.component.scss']
})
export class CurrencyCardComponent implements OnInit {

@Input() currency:string[] = ['GBP','USD'];
         
currencyes=this.currency;

  constructor() { }

  ngOnInit() {

  }

}
