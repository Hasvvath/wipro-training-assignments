import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PriceFormatPipe } from '../price-format-pipe';
import { Highlight } from '../highlight';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [CommonModule, PriceFormatPipe, Highlight],
  templateUrl: './event-list.html',
  animations: [
  trigger('fadeIn', [
    transition(':enter', [
      style({ opacity: 0 }),
      animate('1s', style({ opacity: 1 }))
    ])
  ])
]
})
export class EventList {

  events = [
    { name: 'Tech Innovators Conference', date: '2025-09-12', price: 3500, category: 'Conference' },
    { name: 'Creative Writing Workshop', date: '2025-10-05', price: 800, category: 'Workshop' },
    { name: 'Rock Music Concert', date: '2025-11-20', price: 2500, category: 'Concert' },
    { name: 'AI & Machine Learning Summit', date: '2025-12-02', price: 5000, category: 'Conference' }
  ];
}