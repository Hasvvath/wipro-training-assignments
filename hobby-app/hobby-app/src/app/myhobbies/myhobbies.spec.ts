import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Myhobbies } from './myhobbies';

describe('Myhobbies', () => {
  let component: Myhobbies;
  let fixture: ComponentFixture<Myhobbies>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Myhobbies],
    }).compileComponents();

    fixture = TestBed.createComponent(Myhobbies);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
