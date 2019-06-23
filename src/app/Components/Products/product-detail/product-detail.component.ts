import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../Services/products/products.service';
import { NavController, AlertController } from '@ionic/angular';
import { CommonService } from '../../../Services/Common/common.service';
import { CategoriesService } from '../../../Services/Categories/categories.service';
import { SellersService } from '../../../Services/sellers/sellers.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {

  docId;
  product;
  showLoader: boolean = false;
  verified: boolean;
  constructor(
    private router: ActivatedRoute,
    public prodService: ProductsService,
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public commonService: CommonService,
    public catService: CategoriesService,
    public sellerService: SellersService,
  ) { }

  ngOnInit() {
    this.router.params.subscribe(params => {
      this.docId = params['id'];
    });
    this.getProduct();
  }


  getProduct() {
    this.showLoader = true;
    this.prodService.getSingleProduct(this.docId).subscribe(snap => {
      this.product = snap.payload.data();
      this.product.id = snap.payload.id;
      this.catService.getSingleCategory(this.product.category).subscribe(snap => {
        let temp: any = snap.payload.data();
        this.product.categoryName = temp.name;
      })
      this.catService.getSingleSubCategory(this.product.subCategory).subscribe(snap => {
        let tempi: any = snap.payload.data();
        this.product.subCategoryName = tempi.name;
      })
      this.sellerService.getSingleSeller(this.product.storeId).subscribe(snap => {
        let tempo: any = snap.payload.data();
        this.product.sellerName = tempo.storeName;
      })
      if (this.product.status == "Verified") { this.verified = true } else { this.verified = false }
      this.showLoader = false;
    });
  }

  async confirmVerify() {
    const alert = await this.alertCtrl.create({
      header: this.product.name,
      message: "Verify this Product ?",
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: (blah) => {
          }
        }, {
          text: 'Verify',
          handler: data => {
            this.verifyProduct();
          }
        }
      ]
    });
    return await alert.present();
  }

  async confirmUnVerify() {
    const alert = await this.alertCtrl.create({
      header: this.product.name,
      message: "Unverify this Product ?",
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: (blah) => {
          }
        }, {
          text: 'Unverify',
          handler: data => {
            this.UnverifyProduct();
          }
        }
      ]
    });
    return await alert.present();
  }

  verifyProduct() {
    this.prodService.verifyProduct(this.docId).then(() => {
      this.getProduct();
      this.commonService.presentToast("Product Verified")
    })
  }
  UnverifyProduct() {
    this.prodService.unverifyProduct(this.docId).then(() => {
      this.getProduct();
      this.commonService.presentToast("Product Unverified")
    })
  }

  viewBar() {
    this.navCtrl.navigateForward(`/product/barcode/${this.docId}`)
  }
  gtSeller(id) {
    this.navCtrl.navigateForward(`/seller-details/${id}`)
  }
}
