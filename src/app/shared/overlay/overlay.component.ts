import { Component, OnInit } from '@angular/core';
import { FormModalService } from 'src/app/services/form-modal.service';
import { OverlayService } from './overlay.service';

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss']
})
export class OverlayComponent implements OnInit {

  constructor(
    private overlayService: OverlayService,
    private formModalService: FormModalService
  ) { }

  toggleOverlay() {
    this.overlayService.overlayShow.next();
  }

  ngOnInit(): void {
  }

}
