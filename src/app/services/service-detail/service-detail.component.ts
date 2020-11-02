import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { FormModalService } from '../form-modal.service';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-service-detail',
  templateUrl: './service-detail.component.html',
  styleUrls: ['./service-detail.component.scss']
})
export class ServiceDetailComponent implements OnInit {

  private _service;
  private paramsSubscription: Subscription;
  private serviceSubscription: Subscription;

  constructor(
    private serviceService: ServiceService,
    private activatedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private formModalService: FormModalService
  ) { }

  public toggleFormModal() {
    this.formModalService.formModalToggled.next({
      title: this.service.title,
      serviceId: this.service.id
    });
  }

  set service(service) {
    this._service = service;
  }

  get service() {
    return this._service;
  }

  ngOnInit(): void {
    this.spinner.show();
    this.paramsSubscription = this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.serviceSubscription = this.serviceService.getOneService(params['id']).subscribe(
          service => {
            this.service = service;
            this.spinner.hide();
          }
        ); 
      }
    );
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
    this.serviceSubscription.unsubscribe();
  }

}
