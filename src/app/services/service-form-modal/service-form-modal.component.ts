import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ClientService } from 'src/app/shared/client.service';
import { FormData, FormModalService } from '../form-modal.service';

@Component({
  selector: 'app-service-form-modal',
  templateUrl: './service-form-modal.component.html',
  styleUrls: ['./service-form-modal.component.scss']
})
export class ServiceFormModalComponent implements OnInit, OnDestroy {
  title: string;
  serviceId: string;
  serviceForm: FormGroup;
  subscription: Subscription;
  
  constructor(
    private formModalService: FormModalService,
    private clientService: ClientService
  ) {}

  ngOnInit(): void {
    this.subscription = this.formModalService.formModalToggled.subscribe(
      (formData: FormData) => {
        if (formData) {
          this.serviceId = formData.serviceId;
          this.title = formData.title;
        }
      }
    );
    this.initForm();
  }

  initForm() {
    this.serviceForm = new FormGroup({
      'fullname': new FormControl(null, [Validators.required, Validators.pattern(/^[^0-9]{1,100}$/)]),
      'phone': new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]{9,15}$/)]),
      'message': new FormControl(null)
    });
  }

  onSubmit() {
    const data = this.serviceForm.value;
    this.clientService.post({
      fullname : data.fullname,
      phone: data.phone,
      message: data.message,
      service: this.serviceId
    }).subscribe(
      response => {
        console.log(response);
        this.formModalService.formModalToggled.next(null);
      },
      error => {
        console.log(error);
        this.formModalService.formModalToggled.next(null);
      }
    );
  }

  toggleFormModal() {
    this.formModalService.formModalToggled.next(null);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
