import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http:HttpClient) { }




  getUserByEmail(email:string){
    // return this.http.get(`http://localhost:3000/users?email=${email}`);
    return this.http.get( environment.api_base + `/users/?email=${email}`);
    // .map((response:Response) => response.json());
  }

  getUserByName(username:string){
    // return this.http.get(`http://localhost:3000/users?email=${email}`);
    return this.http.get( environment.api_base + `/users/?username=${username}`);
    // .map((response:Response) => response.json());
  }

  createNewUser(user:User){
    return this.http.post( environment.api_base + `/auth/users/create/`,user);
    // return this.http.post(`http://127.0.0.1:8000/api/users`,user);
    // .map((response:Response) => response.json());
  }

  createToken(user:User){
    return this.http.post( environment.api_base + `/auth/token/create`,user)
  }

  // используем http.post() для получения токена
   token(user:User) {
    return this.http.post( environment.api_base + `/auth/token/create`,user)
    .subscribe((token)=>{
      console.log(token)
    });
  }


  // Login(data:any){
  //   // return this.http.get(`http://localhost:3000/users?email=${email}`);
  //   return this.http.post(`http://127.0.0.1:8000/api/auth/`,data);
  //   // .map((response:Response) => response.json());
  // }


}
