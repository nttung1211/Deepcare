import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubjectsService {
  flash = new Subject<Flash>();

  sidebarClosed = new Subject();
  searchbarClosed = new Subject();
}

export class Flash {
  message: string;
  type: string;
}