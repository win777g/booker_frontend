import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AuthModule } from './auth/auth.module';
import { HttpClientModule } from '@angular/common/http';
// import { FormsModule } from '@angular/forms';
import { UsersService } from './shared/services/users.service';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './shared/services/auth.service';
import { NotFoundComponent } from './shared/not-found/not-found.component';





@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent

  ],
  imports: [
    BrowserModule,
    AuthModule,
    AppRoutingModule,
    HttpClientModule,

    BrowserAnimationsModule,


    // FormsModule
  ],
  providers: [UsersService,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
