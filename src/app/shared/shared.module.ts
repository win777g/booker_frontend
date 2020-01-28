import { NgModule } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { LoaderComponent } from './loader/loader.component';


@NgModule({
  declarations: [LoaderComponent],
  imports: [

    ReactiveFormsModule,
    FormsModule,
    NgxChartsModule
  ],
  exports: [

    ReactiveFormsModule,
    FormsModule,
    NgxChartsModule,
    LoaderComponent

  ],
})
export class SharedModule { }
