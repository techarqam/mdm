import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  category = new FormGroup({
    name: new FormControl("")
  });

  constructor(
    private db: AngularFirestore,
  ) { }

  getCategories() {
    return this.db.collection('Categories', ref => ref.orderBy("name")).snapshotChanges();
  }

  getProducts() {
    return this.db.collection("Products").snapshotChanges()
  }
  getCollbyCat(catId) {
    return this.db.collection("Products", ref => ref.where("category", "==", catId)).snapshotChanges()
  }

}
