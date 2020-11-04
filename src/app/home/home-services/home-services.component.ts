import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Service } from 'src/app/services/Service.model';
import { DataService } from 'src/app/shared/data.service';


@Component({
  selector: 'app-home-services',
  templateUrl: './home-services.component.html',
  styleUrls: ['./home-services.component.scss']
})
export class HomeServicesComponent implements OnInit {
  services = [];

  constructor(
    private dataService: DataService<Service>,
    private spinner: NgxSpinnerService
    ) { }

  ngOnInit(): void {
    if (this.dataService.data.services.length) {
      this.spinner.show();
      this.dataService.table = 'services';
      this.dataService.all().subscribe(
        (services: Service[]) => {
          this.dataService.data.services = services;
          this.services = this.dataService.data.services;
          this.spinner.hide();
        }
      );
    } else {
      this.services = this.dataService.data.services;
    }
  }

}
