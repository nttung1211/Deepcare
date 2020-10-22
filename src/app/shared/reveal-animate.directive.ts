import {Directive, ElementRef, HostBinding, HostListener, Input, OnInit} from '@angular/core';

@Directive({
  selector: '[appRevealAnimate]'
})
export class RevealAnimateDirective implements OnInit {
  @Input('appRevealAnimate') effect;
  @HostBinding('class.hidden') hidden = true;
  @HostBinding('class.animate__animated') animate = true;

  constructor(private refEle: ElementRef) { }

  @HostListener('window:load', ['$event'])
  @HostListener('window:scroll', ['$event'])
  onReveal(e: Event) {
    const offset = this.refEle.nativeElement.getBoundingClientRect().top;
    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);

    if (offset < vh - 100) {
      this.refEle.nativeElement.classList.add(`animate__${this.effect ? this.effect : 'fadeInUp'}`);
    }
  }

  ngOnInit(): void {
  }
}
