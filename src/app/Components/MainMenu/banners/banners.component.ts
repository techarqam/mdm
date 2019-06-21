import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, AlertController } from '@ionic/angular';
import { BannersService } from '../../../Services/banners/banners.service';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-banners',
  templateUrl: './banners.component.html',
  styleUrls: ['./banners.component.scss'],
})
export class BannersComponent implements OnInit {

  banners: Observable<any>;

  showLoader: boolean = true;

  constructor(
    public navCtrl: NavController,
    public bannerService: BannersService,
    private alertCtrl: AlertController,
  ) { }

  ngOnInit() {
    this.getBanners();
  }


  gtAddBanner() {
    this.navCtrl.navigateForward('/add-banner')
  }


  getBanners() {
    this.banners = this.bannerService.getBanners();
    this.banners.subscribe(() => { this.showLoader = false });
  }


  async confirmDelete(banner, id) {
    const alert = await this.alertCtrl.create({
      header: 'Delete Banner ? ',
      message: 'This banner connot be recovered.',
      buttons: [
        {
          text: 'No, Its a mistake',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text: 'Yes, I understand',
          handler: () => {
            this.delBanner(banner, id);
          }
        }
      ]
    });

    await alert.present();
  }


  delBanner(banner, id) {
    banner.id = id;
    this.bannerService.delbanner(banner);
  }

}
