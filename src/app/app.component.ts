import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { SidebarService } from './header/sidebar.service';
import { Post } from './posts/Post.model';
import { FormData, FormModalService } from './services/form-modal.service';
import { Service } from './services/Service.model';
import { DataService } from './shared/data.service';
import { Flash, SubjectsService } from './shared/subjects.service';


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
  services: Service[] = [];
  introPosts: Post[] = [];

  flashOpen = false;
  flashMessage = '';
  flashType = '';

  private formModalsubscription: Subscription;
  private serviceSubscription: Subscription;
  private introSubscription: Subscription;

  constructor(
    private formModalService: FormModalService,
    private router: Router,
    private sidebarService: SidebarService,
    private spinner: NgxSpinnerService,
    private introDataService: DataService<Post>,
    private servicesDataService: DataService<Service>,
    private subjectsService: SubjectsService
  ) {};

  ngOnInit() {
    // close sibar on changing route
    this.router.events.subscribe(e => {
      if (e instanceof NavigationStart) {
        this.sidebarService.sidebarClosed.next();
      }
    });

    // subscribe form modal toggling
    this.formModalsubscription = this.formModalService.formModalToggled.subscribe(
      (formData: FormData) => {
        if (formData) {
          this.formTitle = formData.title;
          this.formServiceId = formData.serviceId;
        }

        this.modalOpen = !this.modalOpen;
      }
    );

    // subscribe flash
    this.subjectsService.flash.subscribe(
      (flash: Flash) => {
        if (flash && flash.message && flash.type) {
          this.flashMessage = flash.message;
          this.flashType = flash.type;
          this.flashOpen = true;
        } else {
          this.flashOpen = false;
        }
      }
    );

    // fetch services
    this.spinner.show();
    this.servicesDataService.table = 'services';
    this.serviceSubscription = this.servicesDataService.all().subscribe(
      services => {
        this.servicesDataService.data.services = services;
        this.services = this.servicesDataService.data.services;
        this.spinner.hide();
      }
    );

    // fetch intro
    this.spinner.show();
    this.introDataService.table = "posts";
    this.introDataService.find('tags.name=gioithieu').subscribe(
      (posts: Post[]) => {
        this.introPosts = posts;
        this.spinner.hide();
      }
    );
  }

  ngOnDestroy() {
    this.formModalsubscription.unsubscribe();
    this.serviceSubscription.unsubscribe();
    this.introSubscription.unsubscribe();
  }
}
