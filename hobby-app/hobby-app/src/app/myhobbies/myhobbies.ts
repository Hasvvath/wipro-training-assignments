import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-myhobbies',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './myhobbies.html'
})
export class MyHobbiesComponent {
  @Input() hobbies!: string[];

  @Output() deleteHobby = new EventEmitter<number>();
}