import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Newhobby } from './newhobby';

describe('Newhobby', () => {
  let component: Newhobby;
  let fixture: ComponentFixture<Newhobby>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Newhobby],
    }).compileComponents();

    fixture = TestBed.createComponent(Newhobby);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
