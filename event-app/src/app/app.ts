import { Component } from '@angular/core';
import { EventList } from './event-list/event-list';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [EventList],
  templateUrl: './app.html',
})
export class App {}