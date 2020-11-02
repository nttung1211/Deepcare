import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { FormModalService } from '../services/form-modal.service';
import { ServiceService } from '../services/service.service';
import { Post, PostService } from '../shared/post.service';
import { SidebarService } from './sidebar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  navOpen = false;
  @Input() services = [];
  introPosts: Post[] = [];
  private serviceSubscription: Subscription;
  private introSubscription: Subscription;

  constructor(
    private formModalService: FormModalService,
    private serviceService: ServiceService,
    private spinner: NgxSpinnerService,
    private postService: PostService,
    private sidebarService: SidebarService
  ) { }

  openNav(): void {
    this.navOpen = true;
  }

  closeNav(): void {
    this.navOpen = false;
  }

  ngOnInit(): void {
    this.sidebarService.sidebarClosed.subscribe(
      () => {
        this.closeNav();
      }
    );


    this.spinner.show();
    this.introSubscription = this.postService.find('tags.name=gioithieu').subscribe(
      (posts: Post[]) => {
        this.introPosts = posts;
        this.spinner.hide();
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
    this.serviceSubscription.unsubscribe();
    this.introSubscription.unsubscribe();
  }

}
