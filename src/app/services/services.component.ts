import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { HelpersService } from '../shared/helpers.service';
import { ServiceService } from './service.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  private _services = [];

  constructor(
    private serviceService: ServiceService,
    private spinner: NgxSpinnerService,
    private helpers: HelpersService
    ) {

  }

  ngOnInit(): void {
    if (!this.serviceService.services.length) {
      this.spinner.show();
      this.subscription = this.serviceService.getALlServices().subscribe((services) => {
        services = services.map(ser => {
          ser.description = this.helpers.shortenString(ser.description, 200);
          return ser;
        });
        this.serviceService.services = services;
        this.services = this.serviceService.services;
        this.spinner.hide();
      });
    } else {
      this.services = this.serviceService.services;
    }
  }


  // GETTERS AND SETTERS
  set services(posts: any[]) {
    this._services = posts;
  }

  get services() {
    return this._services;
  }

  ngOnDestroy() {
    if (this.subscription){
      this.subscription.unsubscribe();
    }
  }

}
