import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { DataService } from '../shared/data.service';
import { HelpersService } from '../shared/helpers.service';
import { Size } from '../shared/Size.enum';
import { Service } from './Service.model';


@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  services = [];

  constructor(
    private dataService: DataService<Service>,
    private spinner: NgxSpinnerService,
    private helpers: HelpersService
    ) {

  }

  ngOnInit(): void {
    if (!this.dataService.data.services.length) {
      this.spinner.show();
      this.dataService.table = 'services';
      this.subscription = this.dataService.all().subscribe((services) => {
        services = services.map(service => {
          service.content = this.helpers.shortenString(service.content, 200);
          service.image.url = this.helpers.getRelevantSize(service.image, Size.Small);
          return service;
        });
        this.dataService.data.services = services;
        this.services = this.dataService.data.services;
        this.spinner.hide();
      });
    } else {
      this.services = this.dataService.data.services;
    }
  }

  ngOnDestroy() {
    if (this.subscription){
      this.subscription.unsubscribe();
    }
  }

}
