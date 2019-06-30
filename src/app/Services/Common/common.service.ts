import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  settings = new FormGroup({
    commission: new FormControl("", Validators.compose([
      Validators.required,
      Validators.min(0),
      Validators.max(10)
    ])),
    paymentKey: new FormControl("", Validators.compose([
      Validators.required,
      Validators.minLength(6)
    ])),
  });

  constructor(
    public toastCtrl: ToastController,
    public db: AngularFirestore,
  ) { }

  getAdmin(uid) {
    return this.db.doc(`Admins/${uid}`).snapshotChanges();
  }
  getSettings() {
    return this.db.doc(`AdminData/Settings`).snapshotChanges();
  }

  async presentToast(msg) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 4000,
      position: "bottom",
      showCloseButton: false,
    });
    toast.present();
  }

  getProfits() {
    return this.db.collection("AdminData").doc("Profits").snapshotChanges();
  }

  async  updateSettings(settings) {
    return this.db.collection("AdminData").doc("Settings").set(settings, { merge: true });
  }
}
