import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-menu',
  standalone: true,
  templateUrl: './menu.html'
})
export class MenuComponent {
  @Output() menuClick = new EventEmitter<string>();

  select(value: string) {
    this.menuClick.emit(value);
  }
}