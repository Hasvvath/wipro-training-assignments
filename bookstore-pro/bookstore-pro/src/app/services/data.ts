import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  getBooks(): Observable<any[]> {
    return of([
      {
        title: 'Angular Basics',
        price: 500,
        date: '2023-05-01',
        description: 'Learn Angular step by step from scratch with practical examples...'
      },
      {
        title: 'Advanced Angular',
        price: 800,
        date: '2022-08-15',
        description: 'Deep dive into Angular architecture, RxJS, and performance tuning...'
      }
    ]);
  }
}