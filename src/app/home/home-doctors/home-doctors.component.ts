import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-doctors',
  templateUrl: './home-doctors.component.html',
  styleUrls: ['./home-doctors.component.scss']
})
export class HomeDoctorsComponent implements OnInit {

  constructor() { }

  slide(toLeft: boolean = true) {
    const doctors = document.querySelector('.doctors');
    doctors.scrollBy({
      left: toLeft ? -370 : 370,
      behavior: 'smooth'
    });
  }

  ngOnInit(): void {
  }

}
