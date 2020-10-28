import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClientService } from 'src/app/shared/client.service';
import { FormModalService } from '../form-modal.service';

@Component({
  selector: 'app-service-form-modal',
  templateUrl: './service-form-modal.component.html',
  styleUrls: ['./service-form-modal.component.scss']
})
export class ServiceFormModalComponent implements OnInit {
  @Input('title') title: string;
  serviceForm: FormGroup;

  constructor(
    private formModalService: FormModalService,
    private clientService: ClientService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.serviceForm = new FormGroup({
      'fullname': new FormControl(null, [Validators.required, Validators.pattern(/^[a-zA-Z ]{1,100}$/)]),
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
      service: '5f97e3e2533566c184ed55e7'
    }).subscribe(
      response => {
        console.log(response);
        this.formModalService.formModalToggled.next();
      },
      error => {
        console.log(error);
        this.formModalService.formModalToggled.next();
      }
    );
  }

  toggleFormModal() {
    this.formModalService.formModalToggled.next();
  }
}
