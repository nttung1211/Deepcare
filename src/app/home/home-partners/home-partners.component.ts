import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/shared/data.service';
import { HomePartner } from './HomePartner.model';

@Component({
  selector: 'app-home-partners',
  templateUrl: './home-partners.component.html',
  styleUrls: ['./home-partners.component.scss']
})
export class HomePartnersComponent implements OnInit, OnDestroy {
  private homePartnersSubscription: Subscription;
  partners: HomePartner[] = [];

  constructor(
    private dataService: DataService<HomePartner>,
  ) { }

  ngOnInit(): void {
    this.dataService.table = 'home-partners';
    this.homePartnersSubscription = this.dataService.all().subscribe(
      (partners: HomePartner[]): void => {
        this.partners = partners;
      }
    );
  }

  ngOnDestroy(): void {
    this.homePartnersSubscription.unsubscribe();
  }

}
