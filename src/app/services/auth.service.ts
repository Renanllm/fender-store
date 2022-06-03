import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth) { }

  async login({email, password}) {
    try {
      const user = await signInWithEmailAndPassword(this.auth, email, password);
      return user;
    } catch (e) {
      return null;
    }
  };
  //rwenroisdhg@askjgfds.com
//13y4g23uy5g34
  async register({email, password}) {
    try {
      const user = await createUserWithEmailAndPassword(this.auth, email, password);
      return user;

    } catch (e) {
      return null;
    }
  };

  logout() {
    return signOut(this.auth);
  }
};
