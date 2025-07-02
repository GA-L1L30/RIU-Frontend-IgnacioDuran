import {Directive, HostListener} from '@angular/core';

@Directive({
  selector: '[appUppercaseDirective]'
})
export class UppercaseDirective {
  @HostListener('input', ['$event.target'])
  onInput(target: EventTarget | null) {
    if (!(target instanceof HTMLInputElement)) return;

    const {selectionStart, selectionEnd, value} = target;
    const upper = value.toUpperCase();

    if (value !== upper) {
      target.value = upper;
      target.setSelectionRange(selectionStart, selectionEnd);
      target.dispatchEvent(new Event('input'));
    }
  }

}
