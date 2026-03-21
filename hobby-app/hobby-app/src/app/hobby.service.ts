import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Hobby } from './hobby.model';

@Injectable({
  providedIn: 'root'
})
export class HobbyService {
  private readonly baseUrl = 'http://localhost:3000/hobbies';

  constructor(private readonly http: HttpClient) {}

  getHobbies(): Observable<Hobby[]> {
    return this.http.get<Hobby[]>(this.baseUrl);
  }

  addHobby(name: string): Observable<Hobby> {
    return this.http.post<Hobby>(this.baseUrl, { name, favorite: false });
  }

  updateHobby(hobby: Hobby): Observable<Hobby> {
    return this.http.put<Hobby>(`${this.baseUrl}/${hobby.id}`, hobby);
  }

  deleteHobby(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
