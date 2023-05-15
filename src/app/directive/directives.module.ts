import { NgModule } from '@angular/core';
import { NumberDirective } from './numbers-only.directive';
import { MinMaxDirective } from './minmax.directive';
@NgModule({
  imports: [],
  declarations: [NumberDirective, MinMaxDirective],
  exports: [NumberDirective, MinMaxDirective]
})
export class DirectivesModule { }