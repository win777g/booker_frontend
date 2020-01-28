import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SVEvent } from '../models/event.model';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http:HttpClient) { }

  tokens = JSON.parse(window.localStorage.getItem('token'));
  httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization':`Token ${this.tokens.auth_token}`,

      })
    };

  url = environment.api_base

  addEvent(event:SVEvent){
    return this.http.post(this.url+`/events/`,event,this.httpOptions);
    // .map((response:Response) => response.json());
  }

  getEvents(){
    // return this.http.get(`http://localhost:3000/events`);
      return this.http.get(this.url+`/events/`,this.httpOptions);
    // .map((response:Response) => response.json());
  }

  getEventById(id:string){
    return this.http.get(this.url+`/events/${id}/`,this.httpOptions);
  }


}
