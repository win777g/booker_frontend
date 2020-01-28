import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[wfmDropdown]'
})

 export class DropgownDirective {
   @HostBinding('class.open') isOpen = false;

   @HostListener('click') onClick(){
     this.isOpen = !this.isOpen;
   }
 }
