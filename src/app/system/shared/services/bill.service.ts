import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Bill } from '../models/bill.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class BillService {


  constructor(
    private http:HttpClient,

     ) {}
  tokens = JSON.parse(window.localStorage.getItem('token'));
  httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization':`Token ${this.tokens.auth_token}`,

      })
    };
  url = environment.api_base

  updateBill(bill:Bill){
    return this.http.put(this.url+`/bill/9/`,bill,this.httpOptions);
    // .map((response:Response) => response.json());
  }


  getBill(){

    return this.http.get(this.url+`/bill/`,this.httpOptions);
    // return this.http.get(`http://localhost:3000/bill`);
    // .map((response:Response) => response.json());
  }

  getCurrency(){
    return this.http.get(`http://data.fixer.io/api/latest?access_key=3d3f6f613510e6f1d184bcbea9c60632`);
    // .map((response:Response) => response.json());
  }
}
