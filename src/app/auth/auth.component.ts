import { Component,OnInit, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { fadeStateTrigger } from '../shared/animations/fade.animation';
@Component({
  selector: 'sv-auth',
  templateUrl: './auth.component.html',
  animations:[fadeStateTrigger]
  // styleUrls: ['./auth.component.scss']
})
export class AuthComponent  implements OnInit{

 @HostBinding('@fade') a = true;
 constructor(private router:Router) {}

 ngOnInit(){
   this.router.navigate(['/login']);
 }

}
