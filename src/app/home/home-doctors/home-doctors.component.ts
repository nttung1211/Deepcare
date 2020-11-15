import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { Doctor } from 'src/app/doctors/Doctor.model';
import { DataService } from 'src/app/shared/data.service';
import { HelpersService } from 'src/app/shared/helpers.service';
import { Size } from 'src/app/shared/Size.enum';

@Component({
  selector: 'app-home-doctors',
  templateUrl: './home-doctors.component.html',
  styleUrls: ['./home-doctors.component.scss']
})
export class HomeDoctorsComponent implements OnInit, OnDestroy {
  doctorsSubscription: Subscription;
  maxDoctors = 10;
  doctors: Doctor[] = [];

  constructor(
    private dataService: DataService<Doctor>,
    private helpers: HelpersService
  ) { }

  ngOnInit(): void {
    if (!this.dataService.data.doctors.length) {
      this.dataService.table = 'doctors';
      this.dataService.all().subscribe(
        (doctors: Doctor[]) => {
          doctors = doctors.map(doctors => {
            doctors.image.url = this.helpers.getRelevantSize(doctors.image, Size.Small);
            return doctors;
          });
          this.dataService.data.doctors = doctors;
          this.doctors = this.dataService.data.doctors;
        }
      );
    } else {
      this.doctors = this.dataService.data.doctors;
    }
  }
 
  slide(toLeft: boolean = true) {
    const doctors = document.querySelector('.doctors');
    doctors.scrollBy({
      left: toLeft ? -370 : 370,
      behavior: 'smooth'
    });
  }

  ngOnDestroy() {

  }

}
