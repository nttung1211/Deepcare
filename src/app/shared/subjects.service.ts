import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubjectsService {
  flash = new Subject<Flash>();
}

export class Flash {
  message: string;
  type: string;
}