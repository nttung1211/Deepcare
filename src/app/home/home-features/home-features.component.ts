import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/posts/Post.model';
import { FormModalService } from 'src/app/services/form-modal.service';
import { DataService } from 'src/app/shared/data.service';
import { HelpersService } from 'src/app/shared/helpers.service';
import { Size } from 'src/app/shared/Size.enum';
import { HomeFeature } from './HomeFeature.model';


@Component({
  selector: 'app-features',
  templateUrl: './home-features.component.html',
  styleUrls: ['./home-features.component.scss']
})
export class HomeFeaturesComponent implements OnInit, OnDestroy {
  private featuresSubscription: Subscription;
  features: Post[] = [];

  constructor(
    private dataService: DataService<HomeFeature>,
    private formModalService: FormModalService,
    private helpers: HelpersService
  ) { }

  ngOnInit(): void {
    this.dataService.table = 'home-features';
    this.featuresSubscription = this.dataService.all().subscribe(
      (features: Post[]) => {
        features = features.map(f => {
          f.image.url = this.helpers.getRelevantSize(f.image, Size.Medium);
          return f;
        });
        this.features = features;
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
