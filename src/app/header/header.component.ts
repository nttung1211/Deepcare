import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  private _navOpen = false;

  constructor() { }

  openNav(): void {
    this.navOpen = true;
  }

  closeNav(): void {
    this.navOpen = false;
  }

  highlightActive(e: Event) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
      page.classList.remove('active');
    });

    const activePage = (e.target as HTMLElement).closest('.page');
    activePage.classList.add('active');
  }

  // GETTERS AND SETTERS
  get navOpen(): boolean {
    return this._navOpen;
  }

  set navOpen(value: boolean) {
    this._navOpen = value;
  }

  ngOnInit(): void {
  }

}
