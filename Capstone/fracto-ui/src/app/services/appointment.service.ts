import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from './api.config';

export interface AppointmentPayload {
  doctorId: number;
  appointmentDate: string;
  timeSlot: string;
  userId?: number;
  status?: string;
}

export interface Appointment {
  id?: number;
  appointmentId?: number;
  userId?: number;
  doctorId?: number;
  doctorName?: string;
  doctor?: { name?: string; doctorName?: string };
  appointmentDate?: string;
  date?: string;
  timeSlot?: string;
  status?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = API_BASE_URL;

  createAppointment(payload: AppointmentPayload): Observable<unknown> {
    return this.http.post(`${this.apiUrl}/Appointment/book`, payload, {
      headers: this.createHeaders()
    });
  }

  getAppointments(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.apiUrl}/Appointment`, {
      headers: this.createHeaders()
    });
  }

  updateAppointmentStatus(id: number, appointment: Appointment, status: string): Observable<unknown> {
    const payload = {
      appointmentId: appointment.appointmentId ?? appointment.id ?? id,
      userId: appointment.userId ?? 0,
      doctorId: appointment.doctorId ?? 0,
      appointmentDate: appointment.appointmentDate ?? appointment.date ?? '',
      timeSlot: appointment.timeSlot ?? '',
      status
    };

    return this.http.put(`${this.apiUrl}/Appointment/${id}`, payload, {
      headers: this.createHeaders()
    });
  }

  deleteAppointment(id: number): Observable<unknown> {
    return this.http.delete(`${this.apiUrl}/Appointment/${id}`, {
      headers: this.createHeaders()
    });
  }

  private createHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  }
}
