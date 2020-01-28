import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Category } from '../../shared/models/category.model';
import { NgForm } from '@angular/forms';
import { SVEvent } from '../../shared/models/event.model';
import * as moment from 'moment';
import { EventService } from '../../shared/services/events.service';
import { BillService } from '../../shared/services/bill.service';
import { Bill } from '../../shared/models/bill.model';
import { mergeMap } from 'rxjs/operators';
import { Message } from 'src/app/shared/models/message.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'sv-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit ,OnDestroy{

  value = 0;
  amount:number;
  sub1:Subscription;
  sub2:Subscription;
  @Input() categories: Category[] = [];
  types = [
    {type:'income', label:'Доход'},
    {type:'outcome', label:'Расход'},
  ]

  message:Message;

  constructor( private eventsService:EventService,
               private billService:BillService) {}

  ngOnInit() {
    this.message = new Message('danger','');
  }

  private showMessage(text:string){
    this.message.text = text;
    window.setTimeout(()=>this.message.text = '',5000)
  }

  onSubmit(form: NgForm) {
  let {amount,description,category,type} = form.value;

  if(amount<0) amount *=1;


  const event = new SVEvent(
    type,amount,category,
    moment().format('DD.MM.YYYY HH:mm:ss'),description);

   this.sub1 = this.billService.getBill()
    .subscribe((bill:Bill)=>{
      bill = bill[0]
      let value = 0;

       if(type === 'outcome'){
         if(amount > bill.value){
          this.showMessage(`На счету недостаточно средств.Вам не хватает${amount-bill.value}.крон`)
           return;
         }else{
          value = bill.value - amount;
         }
       }else{
         value = bill.value + amount;
         }


       this.sub2 =
       this.billService.updateBill(bill)
       .pipe(mergeMap(()=>
       this.eventsService.addEvent(event)
     )
     )
       .subscribe(()=>{
         form.setValue({
           amount:0,
           description: ' ',
           category:1,
           type:'outcome'
         })
       });
    });

  }
 ngOnDestroy(){
  if(this.sub1) this.sub1.unsubscribe();
  if(this.sub2) this.sub1.unsubscribe();
 }
}
