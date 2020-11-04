import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { DataService } from '../shared/data.service';
import { HelpersService } from '../shared/helpers.service';
import { Size } from '../shared/Size.enum';
import { Doctor } from './Doctor.model';


@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.scss']
})
export class DoctorsComponent implements OnInit {
  private subscription: Subscription;
  doctors: Doctor[]= [];
  page = 1;

  constructor(
    private dataService: DataService<Doctor>,
    private spinner: NgxSpinnerService,
    private helpers: HelpersService
    ) {
  }

  ngOnInit(): void {
    if (!this.dataService.data.doctors.length) {
      this.spinner.show();
      this.dataService.table = 'doctors';
      this.dataService.all().subscribe(
        (doctors: Doctor[]) => {
          doctors = doctors.map(doctors => {
            doctors.image.url = this.helpers.getRelevantSize(doctors.image, Size.Small);
            return doctors;
          });
          this.dataService.data.doctors = doctors;
          this.doctors = this.dataService.data.doctors;
          this.spinner.hide();
        }
      );
    } else {
      this.doctors = this.dataService.data.doctors;
    }
  
  }

  onPageChange(e: any) {
    this.page = e;
    window.scrollTo(0, 0);
  }

  ngOnDestroy() {
    if (this.subscription){
      this.subscription.unsubscribe();
    }
  }

}
