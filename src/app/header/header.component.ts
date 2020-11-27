import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Post } from '../posts/Post.model';
import { FormModalService } from '../services/form-modal.service';
import { Service } from '../services/Service.model';
import { SubjectsService } from '../shared/subjects.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  navOpen = false;
  searchOpen = false;
  overlayOpen = false;
  @Input() services: Service[] = [];
  @Input() introPosts: Post[] = [];

  constructor(
    private formModalService: FormModalService,
    private subjectsService: SubjectsService
  ) { }

  ngOnInit(): void {
    // subcribe sidebar closing
    this.subjectsService.sidebarClosed.subscribe(
      () => {
        this.closeNav();
        this.closeOverlay();
      }
    );

    this.subjectsService.searchbarClosed.subscribe(
      () => {
        this.closeSearch();
      }
    );

  }

  openNav(): void {
    this.navOpen = true;
    this.openOverlay();
  }

  closeNav(): void {
    this.navOpen = false;
    this.closeOverlay();
  }

  openSearch(): void {
    this.searchOpen = true;
  }

  closeSearch(): void {
    this.searchOpen = false;
  }

  openOverlay(): void {
    this.overlayOpen = true;
  }

  closeOverlay(): void {
    this.overlayOpen = false;
    this.navOpen = false;
  }

  toggleFormModal() {
    this.formModalService.formModalToggled.next(null);
  }

  ngOnDestroy() {
  }

}
