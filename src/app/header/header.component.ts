import { Component, OnInit } from '@angular/core';
import { FormModalService } from '../services/form-modal.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  private _navOpen = false;

  constructor(
    private formModalService: FormModalService
  ) { }

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

  toggleFormModal() {
    this.formModalService.formModalToggled.next();
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
