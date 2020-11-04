import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Client } from 'src/app/shared/Client.model';
import { DataService } from 'src/app/shared/data.service';
import { SubjectsService } from 'src/app/shared/subjects.service';
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
    private dataService: DataService<Client>,
    private subjectsService: SubjectsService
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
    this.dataService.table = 'clients';
    this.dataService.create({
      fullname : data.fullname,
      phone: data.phone,
      message: data.message,
      service: this.serviceId
    }).subscribe(
      res => {
        this.subjectsService.flash.next({
          message: 'Nhân viên Deepcare sẽ liên lạc với bạn sớm nhất có thể. Xin cảm ơn bạn đã lựa chọn dịch vụ của chúng tôi.',
          type: 'success'
        });
        this.formModalService.formModalToggled.next(null);
      },
      err => {
        console.log(err);
        this.subjectsService.flash.next({
          message: 'Không thể gửi được thông tin. Xin vui lòng thử lại',
          type: 'warning'
        });
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
