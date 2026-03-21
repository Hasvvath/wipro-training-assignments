import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Hobby } from '../hobby.model';

@Component({
  selector: 'app-myhobbies',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './myhobbies.html'
})
export class MyHobbiesComponent {
  @Input() hobbies!: Hobby[];

  @Output() updateHobby = new EventEmitter<Hobby>();
  @Output() deleteHobby = new EventEmitter<number>();

  editingId: number | null = null;
  editName: string = '';

  startEdit(hobby: Hobby) {
    this.editingId = hobby.id;
    this.editName = hobby.name;
  }

  saveEdit(hobby: Hobby) {
    const trimmedName = this.editName.trim();
    if (!trimmedName) {
      return;
    }

    this.updateHobby.emit({
      ...hobby,
      name: trimmedName
    });
    this.cancelEdit();
  }

  toggleFavorite(hobby: Hobby) {
    this.updateHobby.emit({
      ...hobby,
      favorite: !hobby.favorite
    });
  }

  cancelEdit() {
    this.editingId = null;
    this.editName = '';
  }
}
