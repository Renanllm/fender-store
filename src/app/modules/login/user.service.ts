import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from './user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  isUserLoggedSubscription = new BehaviorSubject(this.isUserLogged());

  constructor(private http: HttpClient) {}

  find({ username, password }): Observable<User[]> {
    return this.http.get<User[]>(
      `${environment.baseUrl}/users?username=${username}&password=${password}`
    );
  }

  login(user: User) {
    localStorage.setItem(
      'token',
      btoa(JSON.stringify(`token-to-${user.username}`))
    );
    localStorage.setItem('user', JSON.stringify(user));
    this.updateUserLogged();
  }

  logout() {
    localStorage.clear();
    this.updateUserLogged(false);
  }

  updateUserLogged(value?: boolean) {
    this.isUserLoggedSubscription.next(value ?? this.isUserLogged());
  }

  getUserLogged(): User {
    const userOnLocalStorage = localStorage.getItem('user');
    if (!userOnLocalStorage) {
      return {} as User;
    }

    const user = JSON.parse(userOnLocalStorage);
    return user;
  }

  isUserLogged(): boolean {
    return !!localStorage.getItem('user');
  }
}
