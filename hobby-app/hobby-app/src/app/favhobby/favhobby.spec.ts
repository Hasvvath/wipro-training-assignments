import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Favhobby } from './favhobby';

describe('Favhobby', () => {
  let component: Favhobby;
  let fixture: ComponentFixture<Favhobby>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Favhobby],
    }).compileComponents();

    fixture = TestBed.createComponent(Favhobby);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
