import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SellersService } from '../../../Services/sellers/sellers.service';
import { ProductsService } from '../../../Services/products/products.service';
import { Observable } from 'rxjs';
import { NavController, AlertController } from '@ionic/angular';
import { CommonService } from '../../../Services/Common/common.service';

@Component({
  selector: 'app-seller-detail',
  templateUrl: './seller-detail.component.html',
  styleUrls: ['./seller-detail.component.scss'],
})
export class SellerDetailComponent implements OnInit {

  docId;
  seller;
  showLoader: boolean = false;
  products: Observable<any>;
  verified: boolean;

  constructor(
    private router: ActivatedRoute,
    public sellerService: SellersService,
    public prodService: ProductsService,
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public commonService: CommonService,
  ) { }

  ngOnInit() {
    this.router.params.subscribe(params => {
      this.docId = params['id'];
    });
    this.getSeller();
    this.getProducts();
  }


  getSeller() {
    this.showLoader = true;
    this.sellerService.getSingleSeller(this.docId).subscribe(snap => {
      this.seller = snap.payload.data();
      this.seller.id = snap.payload.id;
      if (this.seller.Status == "Verified") { this.verified = true } else { this.verified = false }
      this.showLoader = false;
    });
  }
  getProducts() {
    this.products = this.prodService.getProductbySeller(this.docId);
    this.prodService.getProductbySeller(this.seller.id).subscribe(snap => {
      console.log(snap)
    });
  }

  productDetail(prodId) {
    this.navCtrl.navigateForward(`/product-details/${prodId}`)
  }


  async confirmVerify() {
    const alert = await this.alertCtrl.create({
      header: this.seller.storeName,
      message: "Verify this Seller ?",
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: (blah) => {
          }
        }, {
          text: 'Verify',
          handler: data => {
            this.verifySeller();
          }
        }
      ]
    });
    return await alert.present();
  }

  async confirmUnVerify() {
    const alert = await this.alertCtrl.create({
      header: this.seller.storeName,
      message: "Unverify this Seller ?",
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: (blah) => {
          }
        }, {
          text: 'Unverify',
          handler: data => {
            this.UnverifySeller();
          }
        }
      ]
    });
    return await alert.present();
  }

  verifySeller() {
    this.sellerService.verifySeller(this.docId).then(() => {
      this.getSeller();
      this.commonService.presentToast("Seller Verified")
    })
  }
  UnverifySeller() {
    this.sellerService.unverifySeller(this.docId).then(() => {
      this.getSeller();
      this.commonService.presentToast("Seller Unverified")
    })
  }


}
