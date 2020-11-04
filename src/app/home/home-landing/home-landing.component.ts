import { Component, OnDestroy, OnInit } from '@angular/core';
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
    private dataService: DataService<HomeLanding>
  ) { }

  ngOnInit(): void {
    this.dataService.table = 'home-landing';
    this.homeLandingSubscription = this.dataService.single().subscribe(
      (landing: HomeLanding) => {
        this.landing = landing;
        this.landing.imageStyle = `linear-gradient(to right, rgba(14, 109, 156, 0.9), rgba(20, 146, 208, .1)), url(${this.landing.image.url})`;
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
    this.homeLandingSubscription.unsubscribe();
  }

}
