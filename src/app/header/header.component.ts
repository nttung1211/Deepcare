import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormModalService } from '../services/form-modal.service';
import { SidebarService } from './sidebar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  navOpen = false;
  @Input() services = [];
  @Input() introPosts = [];

  constructor(
    private formModalService: FormModalService,
    private sidebarService: SidebarService
  ) { }

  openNav(): void {
    this.navOpen = true;
  }

  closeNav(): void {
    this.navOpen = false;
  }

  ngOnInit(): void {
    // subcribe sidebar closing
    this.sidebarService.sidebarClosed.subscribe(
      () => {
        this.closeNav();
      }
    );

  }

  toggleFormModal() {
    this.formModalService.formModalToggled.next({
      title: "Khám tại bệnh viện hoặc phòng khám",
      serviceId: "5f9922d4f4a9ebe8efbb1311"
    });
  }

  ngOnDestroy() {
  }

}
