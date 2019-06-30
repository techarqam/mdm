import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class SellersService {

  status = new FormGroup({
    name: new FormControl("")
  });


  constructor(
    private db: AngularFirestore,
  ) { }

  getSellers() {
    return this.db.collection("Sellers").snapshotChanges()
  }
  getallOrders() {
    return this.db.collection("Orders").snapshotChanges();
  }
  getSellersbyStatus(status) {
    return this.db.collection("Sellers", ref => ref.where("Status", "==", status)).snapshotChanges()
  }
  getSingleSeller(id) {
    return this.db.doc(`Sellers/${id}`).snapshotChanges();
  }

  verifySeller(id) {
    return this.db.doc(`Sellers/${id}`).set({ Status: "Verified" }, { merge: true });
  }

  unverifySeller(id) {
    return this.db.doc(`Sellers/${id}`).set({ Status: "Unverified" }, { merge: true });
  }


}
