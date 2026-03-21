import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyHobbiesComponent } from '../myhobbies/myhobbies';
import { NewHobbyComponent } from '../newhobby/newhobby';
import { FavHobbyComponent } from '../favhobby/favhobby';
import { Hobby } from '../hobby.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MyHobbiesComponent,
    NewHobbyComponent,
    FavHobbyComponent
  ],
  templateUrl: './home.html'
})
export class HomeComponent {
  @Input() selectedMenu!: string;
  @Input() hobbies!: Hobby[];

  @Output() addHobby = new EventEmitter<string>();
  @Output() updateHobby = new EventEmitter<Hobby>();
  @Output() deleteHobby = new EventEmitter<number>();
}
