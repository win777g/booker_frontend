import { Component, OnInit, Input } from '@angular/core';
import { Category } from '../../shared/models/category.model';
import { SVEvent } from '../../shared/models/event.model';

@Component({
  selector: 'sv-history-events',
  templateUrl: './history-events.component.html',
  styleUrls: ['./history-events.component.scss']
})
export class HistoryEventsComponent implements OnInit {

  @Input() categories: Category[] = [];
  @Input() events: SVEvent[] = [];
  searchValue = '';
  searchPlaceholder = 'сумма';
  searchField = 'amount';

  constructor() { }

  ngOnInit() {
    this.events.forEach((e) => {
     e.catName = this.categories.find(c => c.id === +e.category).name;
   });
  }

  getEventClass(e: SVEvent) {
    return {
      'label': true,
      'label-danger': e.type === 'outcome',
      'label-success': e.type === 'income'
    };
  }

  changeCriteria(field:string){
    const nameMap = {
    amount: 'Сумма',
    date:'Дата',
    category:'Категория',
    type:'Тип'
      };
    this.searchPlaceholder = nameMap[field];
    this.searchField = field;
  }

}
