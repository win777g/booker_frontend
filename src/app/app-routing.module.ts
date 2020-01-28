import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,Routes } from '@angular/router';
import { NotFoundComponent } from './shared/not-found/not-found.component';

const routs: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'system', loadChildren:'./system/system.module#SystemModule'},
  {path: '**', component:NotFoundComponent},

]
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routs)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
