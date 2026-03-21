import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Hobby } from '../hobby.model';

import { FavHobbyComponent } from './favhobby';

describe('FavHobbyComponent', () => {
  let component: FavHobbyComponent;
  let fixture: ComponentFixture<FavHobbyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavHobbyComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FavHobbyComponent);
    component = fixture.componentInstance;
    const hobbies: Hobby[] = [{ id: 1, name: 'Cricket', favorite: true }];
    fixture.componentRef.setInput('hobbies', hobbies);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
