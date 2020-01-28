import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../shared/services/categories.service';
import { Category } from '../shared/models/category.model';

@Component({
  selector: 'sv-records-page',
  templateUrl: './records-page.component.html',
  styleUrls: ['./records-page.component.scss']
})
export class RecordsPageComponent implements OnInit {
  categories:Category[] = [];
  isLoaded = false;

  constructor (private categoriesService:CategoriesService) { }

  ngOnInit() {
    this.categoriesService.getCategory()
    .subscribe((categories:Category[])=>{
         this.categories=categories;
         this.isLoaded = true;
    })
  }

  newCategoryAdded(category:Category) {
    this.categories.push(category);
  }

  categoryWasEdited(category: Category) {
    const idx = this.categories
      .findIndex(c => c.id === category.id);
    this.categories[idx] = category;
  }

}
