import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewHobbyComponent } from './newhobby';

describe('NewHobbyComponent', () => {
  let component: NewHobbyComponent;
  let fixture: ComponentFixture<NewHobbyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewHobbyComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NewHobbyComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
