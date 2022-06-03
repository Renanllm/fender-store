import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  DocumentReference
} from '@angular/fire/compat/firestore';
import { Guitar } from '../utils/models/guitar.interface';

@Injectable({
  providedIn: 'root',
})
export class GuitarService {
  constructor(private firestore: AngularFirestore) {}

  findAllListen() {
    return this.firestore.collection<Guitar>('/Guitars/').snapshotChanges();
  }

  create(payload: Omit<Guitar, 'id'>): Promise<DocumentReference> {
    return this.firestore.collection('/Guitars/').add(payload);
  }

  update(payload: Omit<Guitar, 'id'>, guitarId: string) {
    return this.firestore.doc('/Guitars/' + guitarId).update(payload);
  }

  delete(guitarId: string) {
    return this.firestore.doc('/Guitars/' + guitarId).delete();
  }
}
