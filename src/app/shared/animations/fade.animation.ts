import { animate, style, transition, trigger } from '@angular/animations';


export const fadeStateTrigger = trigger('fade', [
  transition(':enter', [
    style({
      opacity: 0
    }),
    // animate(2000)
    animate(0)
  ]),
  // transition(':leave', animate(2000, style({
  transition(':leave', animate(0, style({  
    opacity: 0
  })))
]);
