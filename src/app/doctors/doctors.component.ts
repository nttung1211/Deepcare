import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.scss']
})
export class DoctorsComponent implements OnInit {

  constructor() { }

  slide(toLeft: boolean = true) {
    const doctors = document.querySelector('.doctors');
    doctors.scrollBy({
      left: toLeft ? -300 : 300,
      behavior: 'smooth'
    });
  }

  ngOnInit(): void {
  }

}
