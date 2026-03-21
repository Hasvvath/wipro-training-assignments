import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyHobbiesComponent } from '../myhobbies/myhobbies';
import { NewHobbyComponent } from '../newhobby/newhobby';
import { FavHobbyComponent } from '../favhobby/favhobby';

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
  @Input() hobbies!: string[];

  @Output() addHobby = new EventEmitter<string>();
  @Output() deleteHobby = new EventEmitter<number>();
}