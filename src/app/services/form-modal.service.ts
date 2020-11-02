import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export class FormData {
  public title: string;
  public serviceId: string;
}

@Injectable({
  providedIn: 'root'
})
export class FormModalService {
  formModalToggled = new BehaviorSubject<FormData>(null);
}
