import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import * as moment from 'moment';
import { CommonService } from '../Common/common.service';
@Injectable({
  providedIn: 'root'
})
export class BannersService {
  order: string;
  url: string;


  banner = new FormGroup({
    name: new FormControl(""),
    imageUrl: new FormControl(""),
    timeStamp: new FormControl(moment().format()),
  });


  constructor(
    private firestore: AngularFirestore,
    public commonService: CommonService,
  ) { }



  addBanner(bannerName, bannerImg) {
    return firebase.storage().ref("Banners/" + bannerName).put(bannerImg).then(() => {
      firebase.storage().ref("Banners/" + bannerName).getDownloadURL().then((dURL) => {
        this.banner.setValue({ name: bannerName, imageUrl: dURL, timeStamp: moment().format() })
        // this.url = dURL;
      }).then(() => {
        this.firestore.collection(`Banners`).add(this.banner.value).then(() => {
          this.banner.reset();
          this.commonService.presentToast("Banner Uploaded");
        });
      })
    })
  }


  getBanners() {
    return this.firestore.collection('Banners', ref => ref.orderBy("name")).snapshotChanges();
  }

  delbanner(banner) {
    return firebase.storage().ref("Banners/").child(banner.name).delete().then(() => {
      this.firestore.collection(`Banners`).doc(banner.id).delete().then(() => {
        this.commonService.presentToast("Banner Deleted");
      })
    });

  }

}