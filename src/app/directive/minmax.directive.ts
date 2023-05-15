import { Directive, Input, ElementRef, HostListener } from '@angular/core'

@Directive({
  selector: '[minMax]',
})
export class MinMaxDirective {
  @Input()
  public min: number | any

  @Input()
  public max: number | any

  constructor(private ref: ElementRef) {}

  @HostListener('input', ['$event'])
  public onInput(a_Event: InputEvent): void {
    let val = parseInt(this.ref.nativeElement.value)
    if (this.max !== null && this.max !== undefined && val >= this.max)
      this.ref.nativeElement.value = this.max.toString()
    else if (this.min !== null && this.min !== undefined && val <= this.min)
      this.ref.nativeElement.value = this.min.toString()
  }
}
