import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Guitar } from '../utils/models/guitar.interface';

@Injectable({
  providedIn: 'root',
})
export class GuitarService {
  constructor(private http: HttpClient) {}

  findAll(): Observable<Guitar[]> {
    return this.http.get<Guitar[]>(`${environment.baseUrl}/guitars`);
  }

  create(payload: Omit<Guitar, 'id'>): Observable<Guitar> {
    return this.http.post<Guitar>(`${environment.baseUrl}/guitars`, payload);
  }
}
