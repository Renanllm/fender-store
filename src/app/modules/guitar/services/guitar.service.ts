import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Guitar } from '../utils/models/guitar.interface';

@Injectable({
  providedIn: 'root',
})
export class GuitarService {
  // xpto = new BehaviorSubject({});

  constructor(private http: HttpClient) {}

  findAll(): Observable<Guitar[]> {
    return this.http.get<Guitar[]>(`${environment.baseUrl}/guitars`);
  }

  find(guitarId: number): Observable<Guitar> {
    return this.http.get<Guitar>(`${environment.baseUrl}/guitars/${guitarId}`);
  }

  create(payload: Omit<Guitar, 'id'>): Observable<Guitar> {
    return this.http.post<Guitar>(`${environment.baseUrl}/guitars`, payload);
  }

  update(payload: Omit<Guitar, 'id'>, guitarId: number): Observable<Guitar> {
    return this.http.put<Guitar>(
      `${environment.baseUrl}/guitars/${guitarId}`,
      payload
    );
  }

  delete(guitarId: number): Observable<Guitar> {
    return this.http.delete<Guitar>(
      `${environment.baseUrl}/guitars/${guitarId}`
    );
  }
}
