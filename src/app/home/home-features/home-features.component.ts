import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormModalService } from 'src/app/services/form-modal.service';
import { Post } from 'src/app/shared/post.service';
import { HomeService } from '../home.service';


@Component({
  selector: 'app-features',
  templateUrl: './home-features.component.html',
  styleUrls: ['./home-features.component.scss']
})
export class HomeFeaturesComponent implements OnInit, OnDestroy {
  private featuresSubscription: Subscription;
  features: Post[] = [];

  constructor(
    private homeService: HomeService,
    private formModalService: FormModalService
  ) { }

  ngOnInit(): void {
    this.featuresSubscription = this.homeService.getFeatures().subscribe(
      (features: Post[]) => {
        this.features = features;
        console.log(this.features);
      }
    );
  }

  toggleFormModal() {
    this.formModalService.formModalToggled.next({
      title: "Khám tại bệnh viện hoặc phòng khám",
      serviceId: "5f9922d4f4a9ebe8efbb1311"
    });
  }

  ngOnDestroy(): void {
    this.featuresSubscription.unsubscribe();
  }

}
