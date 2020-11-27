import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { FormModalService } from 'src/app/services/form-modal.service';
import { DataService } from 'src/app/shared/data.service';
import { HomeLanding } from './HomeLanding.model';

@Component({
  selector: 'app-home-landing',
  templateUrl: './home-landing.component.html',
  styleUrls: ['./home-landing.component.scss']
})
export class HomeLandingComponent implements OnInit, OnDestroy {
  private homeLandingSubscription: Subscription;
  landing: HomeLanding;

  constructor(
    private formModalService: FormModalService,
    private dataService: DataService<HomeLanding>,
    private spinner: NgxSpinnerService

  ) { }

  ngOnInit(): void {
    this.spinner.show();
    this.dataService.table = 'home-landing';
    this.homeLandingSubscription = this.dataService.single().subscribe(
      (landing: HomeLanding) => {
        this.landing = landing;
        this.landing.imageStyle = `-webkit-gradient(linear, left top, right top, from(rgba(14, 109, 156, 0.9)), to(rgba(20, 146, 208, .1))), url(${this.landing.image.url})`;
        this.spinner.hide();
      }
    );
  }

  toggleFormModal() {
    this.formModalService.formModalToggled.next(null);
  }
  
  ngOnDestroy() {
    this.homeLandingSubscription.unsubscribe();
  }

}
