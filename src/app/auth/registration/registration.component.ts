import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators,FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../../shared/services/users.service';
import { User } from '../../shared/models/user.model';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'sv-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  usernameerror:string;
  passwordeerror:string;
  form : FormGroup;
  constructor( private usersersvice:UsersService,private router:Router) { }

  ngOnInit() {
    this.form = new FormGroup({
      'email': new FormControl(null,[Validators.required,Validators.email],this.forbiddenEmails.bind(this)),
      'password': new FormControl(null,[Validators.required,Validators.minLength(8)]),
      'name': new FormControl(null,[Validators.required],this.forbiddenName.bind(this)),
      'agree': new FormControl(false,[Validators.requiredTrue]),

    })
  }

  onSubmit(){
    const {email, password, name} = this.form.value;
    const user = new User(email, password, name)
    console.log(user)
    this.usersersvice.createNewUser(user).
    subscribe((user: User)=>{
        this.router.navigate(['/login'],{
          queryParams:{
            nowCanLogin: true
          }
        })
    },(err:HttpErrorResponse)=>{
      this.usernameerror = err.error.username,
      this.passwordeerror = err.error.password
    }
  )
  }
  // ассинхронная валидация email при регистрации
  forbiddenEmails(control: FormControl):Promise<any> {
  return new Promise((resolve, reject) => {
    // console.log(control.value)
    this.usersersvice.getUserByEmail(control.value)
      .subscribe((user: User) => {
        console.log(user[0])
        if (user[0]) {
          resolve({forbiddenEmail: true});
        } else {
          resolve(null);
        }
      });
  });
}

// ассинхронная валидация email при регистрации
forbiddenName(control: FormControl):Promise<any> {
return new Promise((resolve, reject) => {
  // console.log(control.value)
  this.usersersvice.getUserByName(control.value)
    .subscribe((user: User) => {
      console.log(user[0])
      if (user[0]) {
        resolve({forbiddenName: true});
      } else {
        resolve(null);
      }
    });
});
}






}
