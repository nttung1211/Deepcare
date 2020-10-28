import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormModalService } from './services/form-modal.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Deepcare';
  modalOpen = false;
  modalTitle = 'Đặt lịch khám';
  subscription: Subscription

  constructor(
    private formModalService: FormModalService
  ) {};

  ngOnInit() {
    this.subscription = this.formModalService.formModalToggled.subscribe(
      () => {
        this.modalOpen = !this.modalOpen;
      }
    );
  }
}
