import { Directive, HostListener, ElementRef, HostBinding } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.show') isOpen = false;

  constructor(private eleRef: ElementRef) { }

  @HostListener('document:mouseout', ['$event'])
  @HostListener('document:mouseover', ['$event'])
  onOpen(event: Event) {
    if (this.eleRef.nativeElement.contains(event.target)) {
      this.isOpen = !this.isOpen;
    } else {
      this.isOpen = false;
    }
  }
}
