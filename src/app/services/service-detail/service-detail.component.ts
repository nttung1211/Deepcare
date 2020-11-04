import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/shared/data.service';
import { HelpersService } from 'src/app/shared/helpers.service';
import { Size } from 'src/app/shared/Size.enum';
import { FormModalService } from '../form-modal.service';
import { Service } from '../Service.model';


@Component({
  selector: 'app-service-detail',
  templateUrl: './service-detail.component.html',
  styleUrls: ['./service-detail.component.scss']
})
export class ServiceDetailComponent implements OnInit {
  storage = 'services';
  service: Service;
  relatedServices: Service[] = [];
  maxRelatedServices = 3;

  private paramsSubscription: Subscription;
  private serviceSubscription: Subscription;
  private relatedServicesSubscription: Subscription;

  constructor(
    private dataService: DataService<Service>,
    private activatedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private formModalService: FormModalService,
    private helpers: HelpersService

  ) { }

  ngOnInit(): void {
    this.paramsSubscription = this.activatedRoute.params.subscribe(
      (params: Params) => {
        if (!this.dataService.data[this.storage].length) {
          this.fetchService(params['id']);
        } else {
          for (const service of this.dataService.data[this.storage]) {
            if (service.id === params['id']) {
              service.image.url = this.helpers.getRelevantSize(service.image, Size.Large);
              this.service = service;
              this.relatedServices = this.proccessRealatedServices(this.dataService.data[this.storage], params['id']);
              break;
            }
          }
        }
      }
    );
  }

  fetchService(id: string) {
    this.spinner.show();
    this.dataService.table = 'services';
    this.serviceSubscription = this.dataService.findOne(id).subscribe(
      service => {
        this.service = service;
        this.spinner.hide();
        this.fetchRelatedServices(id);  
      }
    );
  }

  fetchRelatedServices(id: string) {
    this.relatedServicesSubscription = this.dataService.find(`_limit=${this.maxRelatedServices + 1}`).subscribe(
      (services: Service[]) => {
        this.relatedServices = this.proccessRealatedServices(services, id);
      }
    );
  }

  proccessRealatedServices(services: Service[], id: string) {
    const relatedServices = [];
    for (let i = 0; i < services.length; i++) {
      if (services[i].id !== id && relatedServices.length < this.maxRelatedServices) {
        services[i].subtitle = this.helpers.shortenString(services[i].subtitle, 100);
        services[i].image.url = this.helpers.getRelevantSize(services[i].image, Size.Small);
        relatedServices.push(services[i]);
      }
    }
    return relatedServices;
  }

  toggleFormModal() {
    this.formModalService.formModalToggled.next({
      title: this.service.title,
      serviceId: this.service.id
    });
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();

    if (this.serviceSubscription) {
      this.serviceSubscription.unsubscribe();
    }

    if (this.relatedServicesSubscription) {
      this.relatedServicesSubscription.unsubscribe();
    }
  }

}
