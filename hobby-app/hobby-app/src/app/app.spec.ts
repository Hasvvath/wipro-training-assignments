import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AppComponent } from './app';
import { HobbyService } from './hobby.service';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        {
          provide: HobbyService,
          useValue: {
            getHobbies: () => of([]),
            addHobby: () => of({ id: 1, name: 'Test', favorite: false }),
            updateHobby: () => of({ id: 1, name: 'Test', favorite: false }),
            deleteHobby: () => of(void 0)
          }
        }
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
