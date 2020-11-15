import { Directive, HostListener, ElementRef, HostBinding } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.show') isOpen = false;
  @HostBinding('class.mobile-show') isOpenOnMobile = false;

  constructor(private eleRef: ElementRef) { }

  @HostListener('document:click', ['$event'])
  onOpenOnclick(event: Event) {
    if (this.eleRef.nativeElement.contains(event.target)) {
      this.isOpenOnMobile = !this.isOpenOnMobile;
    } else {
      this.isOpenOnMobile = false;
    }
  }

  // @HostListener('document:mouseout', ['$event'])
  @HostListener('document:mouseover', ['$event'])
  onOpen(event: Event) {
    if (this.eleRef.nativeElement.contains(event.target)) {
      this.isOpen = true;
    } else {
      this.isOpen = false;
    }
  }
}
