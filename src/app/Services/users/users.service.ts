import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private db: AngularFirestore,
  ) { }

  getUsers() {
    return this.db.collection("Users").snapshotChanges()
  }
  getSingleUser(id) {
    return this.db.collection("Users").doc(id).snapshotChanges()
  }
  getCart(id) {
    return this.db.collection("Cart", ref => ref.where("userId", "==", id)).snapshotChanges();
  }
  getOrders(id) {
    return this.db.collection("Orders", ref => ref.where("userId", "==", id)).snapshotChanges();
  }
}
