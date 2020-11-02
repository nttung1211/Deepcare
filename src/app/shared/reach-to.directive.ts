import {Directive, HostListener, Input, OnInit} from '@angular/core';

@Directive({
  selector: '[appReachTo]'
})
export class ReachToDirective implements OnInit {
  @Input('appReachTo') selector: string;

  constructor() { }

  @HostListener('click', ['$event'])
  reachTo(e: Event) {
    document.querySelector(this.selector).scrollIntoView();
  }

  ngOnInit(): void {
  }
}
