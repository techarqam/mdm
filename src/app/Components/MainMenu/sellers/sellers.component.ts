import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SellersService } from '../../../Services/sellers/sellers.service';
import { MenuController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-sellers',
  templateUrl: './sellers.component.html',
  styleUrls: ['./sellers.component.scss'],
})
export class SellersComponent implements OnInit {

  sellers: Observable<any>;
  showLoader: boolean = false;

  constructor(
    public sellerService: SellersService,
    public menuCtrl: MenuController,
    public navCtrl: NavController,
  ) {
    this.menuCtrl.enable(true);
  }

  ngOnInit() {
    this.getSellers();
  }

  getSellers() {
    this.showLoader = true;
    this.sellers = this.sellerService.getSellers();
    this.sellers.subscribe(() => { this.showLoader = false });
  }
  getSellerbyStatus(status) {
    this.showLoader = true;
    this.sellers = this.sellerService.getSellersbyStatus(status);
    this.sellers.subscribe(() => { this.showLoader = false });
  }
  sellerDetail(id) {
    this.navCtrl.navigateForward(`/seller-details/${id}`)
  }

  filterSellers(status) {
    if (status) {
      this.getSellerbyStatus(status);
    } else {
      this.getSellers();
    }
    console.log(status)
  }
}


