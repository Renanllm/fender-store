import { AngularFirestore } from '@angular/fire/compat/firestore';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserCredential } from 'firebase/auth';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from './user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  isUserLoggedSubscription = new BehaviorSubject(this.isUserLogged());

  constructor(private firestore: AngularFirestore) {}

  findUsers() {
    return this.firestore.collection<User>('/users/').valueChanges();
  }

  login(credentials: UserCredential) {
    this.findUsers().subscribe(users => {
      const email = credentials.user.email;
      const user = users.find(u => u.email === email);

      localStorage.setItem('user', JSON.stringify(user));
    });

    localStorage.setItem(
      'token',
      JSON.stringify(credentials.user.refreshToken)
    );

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
