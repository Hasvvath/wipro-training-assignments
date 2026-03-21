import { Component } from '@angular/core';
import { MenuComponent } from './menu/menu';
import { HomeComponent } from './home/home';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MenuComponent, HomeComponent],
  templateUrl: './app.html'
})
export class AppComponent {
  selectedMenu: string = 'my';

  hobbies: string[] = ['Cricket', 'Music'];

  onMenuChange(value: string) {
    this.selectedMenu = value;
  }

  addHobby(newHobby: string) {
    this.hobbies.push(newHobby);
  }

  deleteHobby(index: number) {
    this.hobbies.splice(index, 1);
  }
}