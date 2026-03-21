import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-favhobby',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favhobby.html'
})
export class FavHobbyComponent {
  @Input() hobbies!: string[];
}