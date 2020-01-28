import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { EventService } from '../../shared/services/events.service';
import { CategoriesService } from '../../shared/services/categories.service';
import { mergeMap } from 'rxjs/operators';
import { SVEvent } from '../../shared/models/event.model';
import { Category } from '../../shared/models/category.model';
import { Subscription } from 'rxjs';
@Component({
  selector: 'sv-history-detail',
  templateUrl: './history-detail.component.html',
  styleUrls: ['./history-detail.component.scss']
})
export class HistoryDetailComponent implements OnInit, OnDestroy {
  event: SVEvent;
  category: Category;

  isLoaded = false;
  s1: Subscription;

  constructor(private route: ActivatedRoute,
              private eventsService:EventService,
              private categoriesService:CategoriesService) { }

  ngOnInit() {
    this.route.params
    .pipe(mergeMap((params:Params) => this.eventsService.getEventById(params['id'])))
    .pipe(mergeMap((event:SVEvent)=>{
      this.event = event;
      console.log(this.event)
      console.log(event.category)
      return this.categoriesService.getCategoryById(event.category);
    }))
      .subscribe((category:Category)=>{
        this.category = category;
        this.isLoaded = true;
      })

  }

  ngOnDestroy(){
    if(this.s1){
      this.s1.unsubscribe();
    }
  }

}
