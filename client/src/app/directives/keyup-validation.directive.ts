import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appKeyupValidation]'
})
export class KeyupValidationDirective {

  constructor(private ngControl: NgControl) { }

  @HostListener('keyup', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    this.ngControl.control?.updateValueAndValidity();
  }
}