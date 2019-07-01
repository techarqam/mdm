import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class MdmMainService {
  constructor(
    public db: AngularFirestore,
  ) { }
  getMDMs() {
    return this.db.collection("MDMMaster").snapshotChanges();
  }
  getFields(mdmName) {
    return this.db.collection("MDMMaster").doc(mdmName).collection("fields", ref => ref.orderBy('order', 'asc')).valueChanges();
  }




  addDoc(mdmName, data) {
    return this.db.collection(mdmName).add(data);
  }
  getCollection(collectionName) {
    return this.db.collection(collectionName).snapshotChanges();
  }
}
