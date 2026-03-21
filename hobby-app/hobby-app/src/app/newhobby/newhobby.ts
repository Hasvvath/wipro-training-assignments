import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-newhobby',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './newhobby.html'
})
export class NewHobbyComponent {
  newHobby: string = '';

  @Output() addHobby = new EventEmitter<string>();

  add() {
    if (this.newHobby.trim()) {
      this.addHobby.emit(this.newHobby);
      this.newHobby = '';
    }
  }
}