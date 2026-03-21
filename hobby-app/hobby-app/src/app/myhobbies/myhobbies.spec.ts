import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Hobby } from '../hobby.model';

import { MyHobbiesComponent } from './myhobbies';

describe('MyHobbiesComponent', () => {
  let component: MyHobbiesComponent;
  let fixture: ComponentFixture<MyHobbiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyHobbiesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MyHobbiesComponent);
    component = fixture.componentInstance;
    const hobbies: Hobby[] = [{ id: 1, name: 'Cricket', favorite: false }];
    fixture.componentRef.setInput('hobbies', hobbies);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
