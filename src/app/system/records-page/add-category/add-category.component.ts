import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CategoriesService } from '../../shared/services/categories.service';
import { Category } from '../../shared/models/category.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'sv-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit,OnDestroy {

  sub1:Subscription;
  @Output() onCategoryAdd = new EventEmitter<Category>();

  constructor(private categoriesService:CategoriesService) { }

  ngOnInit() {
  }
    capacity:number;
    catname:number;
  onSubmit(form: NgForm){

    let {capacity, name} = form.value;
    if (capacity < 0) capacity *= -1;
    const  category = new Category(name,capacity)
    console.log(category)
    this.sub1 = this.categoriesService.addCategory(category)
       .subscribe((category:Category)=>{
         form.reset();
         this.onCategoryAdd.emit(category);
       })
  }
 ngOnDestroy(){
   if(this.sub1)this.sub1.unsubscribe();
 }
}
