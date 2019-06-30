import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FaqsService {

  userFaqs = new FormGroup({
    question: new FormControl("", Validators.compose([
      Validators.required,
      Validators.minLength(10)
    ])),
    answer: new FormControl("", Validators.compose([
      Validators.required,
      Validators.minLength(10)
    ])),
    userType: new FormControl("User"),
  });
  vendorFaqs = new FormGroup({
    question: new FormControl("", Validators.compose([
      Validators.required,
      Validators.minLength(10)
    ])),
    answer: new FormControl("", Validators.compose([
      Validators.required,
      Validators.minLength(10)
    ])),
    userType: new FormControl("Vendor"),
  });

  constructor(
    public db: AngularFirestore,
  ) {

  }


  addFaq(faq) {
    return this.db.collection("Faqs").add(faq);
  }

  getVendorFaqs() {
    return this.db.collection("Faqs", ref => ref.where("userType", "==", "Vendor")).snapshotChanges();
  }

  getUserFaqs() {
    return this.db.collection("Faqs", ref => ref.where("userType", "==", "User")).snapshotChanges();
  }

}