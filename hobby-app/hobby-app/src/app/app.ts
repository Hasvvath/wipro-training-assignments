import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu';
import { HomeComponent } from './home/home';
import { Hobby } from './hobby.model';
import { HobbyService } from './hobby.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, MenuComponent, HomeComponent],
  templateUrl: './app.html'
})
export class AppComponent implements OnInit {
  selectedMenu: string = 'my';
  hobbies: Hobby[] = [];
  errorMessage: string = '';

  constructor(private readonly hobbyService: HobbyService) {}

  ngOnInit(): void {
    this.loadHobbies();
  }

  onMenuChange(value: string) {
    this.selectedMenu = value;
  }

  addHobby(newHobby: string) {
    this.hobbyService.addHobby(newHobby).subscribe({
      next: (createdHobby) => {
        this.hobbies = [...this.hobbies, createdHobby];
      },
      error: () => {
        this.errorMessage = 'Could not add hobby. Please check json-server.';
      }
    });
  }

  updateHobby(updatedHobby: Hobby) {
    this.hobbyService.updateHobby(updatedHobby).subscribe({
      next: (savedHobby) => {
        this.hobbies = this.hobbies.map((hobby) =>
          hobby.id === savedHobby.id ? savedHobby : hobby
        );
      },
      error: () => {
        this.errorMessage = 'Could not update hobby. Please check json-server.';
      }
    });
  }

  deleteHobby(id: number) {
    this.hobbyService.deleteHobby(id).subscribe({
      next: () => {
        this.hobbies = this.hobbies.filter((hobby) => hobby.id !== id);
      },
      error: () => {
        this.errorMessage = 'Could not delete hobby. Please check json-server.';
      }
    });
  }

  private loadHobbies() {
    this.hobbyService.getHobbies().subscribe({
      next: (hobbies) => {
        this.hobbies = hobbies;
        this.errorMessage = '';
      },
      error: () => {
        this.errorMessage =
          'Could not load hobbies. Start json-server on http://localhost:3000.';
      }
    });
  }
}
