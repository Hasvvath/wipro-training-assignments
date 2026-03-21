import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Hobby } from '../hobby.model';

@Component({
  selector: 'app-favhobby',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favhobby.html'
})
export class FavHobbyComponent {
  @Input() hobbies!: Hobby[];

  get favoriteHobbies(): Hobby[] {
    return this.hobbies.filter((hobby) => hobby.favorite);
  }
}
