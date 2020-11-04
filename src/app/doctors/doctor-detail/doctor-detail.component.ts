import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/shared/data.service';
import { HelpersService } from 'src/app/shared/helpers.service';
import { Size } from 'src/app/shared/Size.enum';
import { Doctor } from '../Doctor.model';


@Component({
  selector: 'app-doctor-detail',
  templateUrl: './doctor-detail.component.html',
  styleUrls: ['./doctor-detail.component.scss']
})
export class DoctorDetailComponent implements OnInit, OnDestroy {
  doctor: Doctor;
  relatedDoctors: Doctor[] = [];
  maxRelatedDoctors = 3;
  storage = 'doctors';
  private paramsSubscription: Subscription;
  private doctorSubscription: Subscription;
  private relatedDoctorsSubscription: Subscription;

  constructor(
    private dataService: DataService<Doctor>,
    private activatedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private helpers: HelpersService
  ) { }

  ngOnInit(): void {
    this.paramsSubscription = this.activatedRoute.params.subscribe(
      (params: Params) => {
        if (!this.dataService.data[this.storage].length) {
          this.fetchDoctor(params['id']);
        } else {
          for (const doctor of this.dataService.data[this.storage]) {
            if (doctor.id === params['id']) {
              doctor.image.url = this.helpers.getRelevantSize(doctor.image, Size.Large);
              this.doctor = doctor;
              this.relatedDoctors = this.proccessRealatedDoctors(this.dataService.data[this.storage], params['id']);
              break;
            }
          }
        }
      }
    );
  }

  fetchDoctor(id: string) {
    this.spinner.show();
    this.dataService.table = 'doctors';
    this.doctorSubscription = this.dataService.findOne(id).subscribe(
      doctor => {
        this.doctor = doctor;
        this.spinner.hide();
        this.fetchRelatedDoctors(id);  
      }
    );
  }

  fetchRelatedDoctors(id: string) {
    this.relatedDoctorsSubscription = this.dataService.find(`_limit=${this.maxRelatedDoctors + 1}`).subscribe(
      (doctors: Doctor[]) => {
        this.relatedDoctors = this.proccessRealatedDoctors(doctors, id);
      }
    );
  }

  proccessRealatedDoctors(doctors: Doctor[], id: string) {
    const relatedDoctors = [];
    for (let i = 0; i < doctors.length; i++) {
      if (doctors[i].id !== id && relatedDoctors.length < this.maxRelatedDoctors) {
        doctors[i].description = this.helpers.shortenString(doctors[i].description, 100);
        doctors[i].image.url = this.helpers.getRelevantSize(doctors[i].image, Size.Small);
        relatedDoctors.push(doctors[i]);
      }
    }
    return relatedDoctors;
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
    
    if (this.doctorSubscription) {
      this.doctorSubscription.unsubscribe();
    }
    if (this.relatedDoctorsSubscription) {
      this.relatedDoctorsSubscription.unsubscribe();
    }
  }

}
