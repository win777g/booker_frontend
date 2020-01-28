import { Component, OnInit, OnDestroy } from '@angular/core';
import { BillService } from '../shared/services/bill.service';
import { CategoriesService } from '../shared/services/categories.service';
import { EventService } from '../shared/services/events.service';
import { combineLatest, Subscription } from 'rxjs';
import { Bill } from '../shared/models/bill.model';
import { SVEvent } from '../shared/models/event.model';
import { Category } from '../shared/models/category.model';

@Component({
  selector: 'sv-planning-page',
  templateUrl: './planning-page.component.html',
  styleUrls: ['./planning-page.component.scss']
})
export class PlanningPageComponent implements OnInit,OnDestroy {

  s1: Subscription;
  isLoaded = false;
  bill: Bill;
  categories: Category[] = [];
  events: SVEvent[] = [] ;

  constructor(private billService:BillService,
              private categoriesSeervice:CategoriesService,
              private eventsService:EventService,
) { }

  ngOnInit() {
    this.s1 = combineLatest(
      this.billService.getBill(),
      this.categoriesSeervice.getCategory(),
      this.eventsService.getEvents()
    ).subscribe((data:[Bill,Category[],SVEvent[]])=>{
           this.bill = data[0];
           this.bill = this.bill[0];
           this.categories = data[1];
           this.events = data[2];
           // console.log(this.categories)
           // console.log(this.events)

        this.isLoaded = true;
    })
  }

  getCategoryCost(cat:Category)
  {
    const catEvents = this.events.filter(e => +e.category === cat.id && e.type ==='outcome');


    return catEvents.reduce((total, e)=>{
      // debugger

      total += +e.amount;
      return total;
    },0);
  }

  getPercent(cat: Category){
   const percent = (100 * this.getCategoryCost(cat)) / cat.capacity;
   return percent > 100 ? 100 : percent;

 }

  getCatPercent(cat: Category){
   return this.getPercent(cat) + '%';
 }

 getCatColorClass(cat: Category){
   const percent = this.getPercent(cat);
   return percent < 60 ? 'success' : percent >= 100 ? 'danger' : 'warning';
 }

  ngOnDestroy(){
    if (this.s1){
       this.s1.unsubscribe()};
  }

}
