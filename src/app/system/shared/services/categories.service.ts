import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Category } from '../models/category.model';
import { BillService } from './bill.service';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})


export class CategoriesService {

  constructor(
    private http:HttpClient,

  ) { }
  tokens = JSON.parse(window.localStorage.getItem('token'));
  httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization':`Token ${this.tokens.auth_token}`,

      })
    };

  url = environment.api_base
  addCategory(category:Category){
      // return this.http.post(`http://localhost:3000/categories`,category);
      return this.http.post(this.url+`/categories/`,category,this.httpOptions);
    // .map((response:Response) => response.json());
  }

  getCategory(){
      // return this.http.get(`http://localhost:3000/categories`);
      return this.http.get(this.url+`/categories/`,this.httpOptions);
  }

  updateCategory(category: Category){
      return this.http.put(this.url+`/categories/${category.id}/`, category,this.httpOptions);
  }

  getCategoryById(id:number){
      return this.http.get(this.url+`/categories/${id}/`,this.httpOptions);
  }
}
