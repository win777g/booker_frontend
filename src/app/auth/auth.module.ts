import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from './registration/registration.component';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AuthGuard } from '../shared/services/auth.guard';
@NgModule({
  declarations: [

  RegistrationComponent,
  AuthComponent,
  LoginComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
  ],
  providers: [AuthGuard],
  bootstrap: []
})
export class AuthModule { }
