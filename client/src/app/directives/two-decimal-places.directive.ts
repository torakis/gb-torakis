import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appTwoDecimalPlaces]',
})
export class TwoDecimalPlacesDirective {
  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event.target.value'])
  onInput(value: string) {
    const regex = /^[a-zA-Z0-9]*\.?[a-zA-Z0-9]{0,2}$/;

    if (!regex.test(value)) {
      this.el.nativeElement.value = value.slice(0, -1);
    }
  }
}
