import { Component, Input, OnInit } from '@angular/core';
import { SubjectsService } from '../subjects.service';

@Component({
  selector: 'app-flash',
  templateUrl: './flash.component.html',
  styleUrls: ['./flash.component.scss']
})
export class FlashComponent implements OnInit {
  @Input() message: string;
  @Input() type: string;
  title: string;

  constructor(
    private subjectsService: SubjectsService
  ) { }

  ngOnInit(): void {
    switch (this.type) {
      case 'success':
        this.title = 'thành công !';
        break;
      case 'warning':
        this.title = 'không thành công';
        break;
      default:
        this.title = 'chú ý';
    }
  }

  close() {
    this.subjectsService.flash.next(null);
  }

}
