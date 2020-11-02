import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { SidebarService } from './header/sidebar.service';
import { FormData, FormModalService } from './services/form-modal.service';
import { ServiceService } from './services/service.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Deepcare';
  modalOpen = true;
  formTitle: string;
  formServiceId: string;
  services = [];
  private formModalsubscription: Subscription;
  private serviceSubscription: Subscription;

  constructor(
    private formModalService: FormModalService,
    private router: Router,
    private sidebarService: SidebarService,
    private serviceService: ServiceService,
    private spinner: NgxSpinnerService
  ) {};

  ngOnInit() {
    this.router.events.subscribe(e => {
      if (e instanceof NavigationStart) {
        this.sidebarService.sidebarClosed.next();
      }
    });

    this.formModalsubscription = this.formModalService.formModalToggled.subscribe(
      (formData: FormData) => {
        if (formData) {
          this.formTitle = formData.title;
          this.formServiceId = formData.serviceId;
        }

        this.modalOpen = !this.modalOpen;
      }
    );

    if (!this.serviceService.services.length) {
      this.spinner.show();
      this.serviceSubscription = this.serviceService.getALlServices().subscribe(
        services => {
          this.serviceService.services = services;
          this.services = this.serviceService.services;
          this.spinner.hide();
        }
      );
    } else {
      this.services = this.serviceService.services;
    }
  }

  ngOnDestroy() {
    this.formModalsubscription.unsubscribe();
    this.serviceSubscription.unsubscribe();
  }
}
