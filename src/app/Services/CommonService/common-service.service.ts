import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {

  constructor(
    public toastCtrl: ToastController,
  ) { }


  async presentToast(msg) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 4000,
      position: "bottom",
      showCloseButton: false,
    });
    toast.present();
  }
}
