import { Component, OnInit, HostBinding } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
// import { Router } from '@angular/router';ActivatedRoute
import { Router, ActivatedRoute ,Params} from '@angular/router';
import { UsersService } from '../../shared/services/users.service';
import { User } from '../../shared/models/user.model';
// import { Observable } from 'rxjs';
import { Message } from '../../shared/models/message.model';
import { AuthService } from '../../shared/services/auth.service';
import { fadeStateTrigger } from 'src/app/shared/animations/fade.animation';
import { Title, Meta } from '@angular/platform-browser';
@Component({
  selector: 'sv-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations:[fadeStateTrigger]
})
export class LoginComponent implements OnInit {
@HostBinding('@fade') a = true;
  form: FormGroup;
  user:any;
  message: Message;
  token:any;




  constructor(
    private usersersvice:UsersService,
    private authService:AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private title: Title,
    private meta: Meta,

  ) {
       title.setTitle('Вход в систему');
       meta.addTag(
         { name:'keywords', content:'login,enter-login'},
         // { name:'description', content:'login,enter-login'}
       );
       meta.addTag(
         { name:'description', content:'login,enter-login'}
       )
  }


  ngOnInit() {

  this.message = new Message('danger', '');
    this.route.queryParams
          .subscribe((params:Params)=>{
             if(params['nowCanLogin']){
               this.showMessage({
                 text:'Теперь вы можете войти в систему',
                 type: 'success'
               });
             } else if (params['accessDenied']){
               this.showMessage({
                 text:'Для работы с системой вам необходимо войти',
                 type: 'warning'
               });
             }
          });

    this.form = new FormGroup({
      'username': new FormControl(null,
        [Validators.required,

        ]),

       'email': new FormControl(null,
         [Validators.required,
          Validators.email,
         ]),

       'password': new FormControl(null,
         [Validators.required,
          Validators.minLength(6),
         ]),
    })
  }
  private showMessage(message: Message) {
     this.message = message;
     // window.setTimeout(() => {
     //   this.message.text = '';
     // }, 5000);
   }



  onSubmit(){
    const formData = this.form.value;
    console.log(this.form);
    this.usersersvice
      .createToken(formData)
      // .getUserByEmail(formData.email)
      .subscribe((token) =>{
        // console.log(token)
        // if(user[0]){
        //   if(user[0].email === formData.email){
        //       // alert('Пароль верный')
        //       this.message.text = '';
        //       window.localStorage.setItem('user', JSON.stringify(user));
        //       this.authService.login();
        //    this.router.navigate(['/system','bill']);
        //   }else{
        //       this.showMessage({
        //         text:'Пароль не верный',
        //         type: 'danger'
        //       })
        //   }
        // }
        if(token){
           window.localStorage.setItem('token', JSON.stringify(token));
           this.token = JSON.parse(window.localStorage.getItem('token'));
           this.token = this.token.auth_token;
           console.log(this.token)
           window.localStorage.setItem('user', JSON.stringify(formData.username));
           this.authService.login();

          this.router.navigate(['/system','bill']);
        }
        else{
          this.showMessage({
            text:'Такого пользователя не существует!',
            type: 'danger'
          })
        }

      });
  }



}
