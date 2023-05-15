import { Directive, ElementRef, HostListener } from '@angular/core'

@Directive({
  selector: '[appApeFormatInputNumber]',
})
export class ApeFormatInputNumberDirective {
  el
  constructor(el: ElementRef) {
    this.el = el
  }

  @HostListener('keydown', ['$event']) onKeyDown(e: any) {
    // if (e.shiftKey && e.keyCode == 9) {
    //   console.log('shift and tab')
    // }
    this.el.nativeElement.value = '999'
  }

  // @HostListener('keyup', ['$event'])
  // KeyUpEvent(event: KeyboardEvent) {
  //   console.log('haha keyup')
  // }
}
