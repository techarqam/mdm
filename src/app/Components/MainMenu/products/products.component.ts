import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../Services/products/products.service';
import { Observable } from 'rxjs';
import { MenuController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {

  name: string = 'Products';

  products: Observable<any>;
  showLoader: boolean = false;
  cats: Observable<any>;

  constructor(
    public prodService: ProductsService,
    public menuCtrl: MenuController,
    public navCtrl: NavController,
  ) {
    this.menuCtrl.enable(true);
  }

  ngOnInit() {
    this.getProducts();
    this.getCategories();
  }

  getCategories() {
    this.showLoader = true;
    this.cats = this.prodService.getCategories();
    this.cats.subscribe(() => { this.showLoader = false });
  }

  getProducts() {
    this.showLoader = true;
    this.products = this.prodService.getProducts();
    this.products.subscribe(() => { this.showLoader = false });
  }
  filterProd(catId) {
    if (catId) {
      this.getProductsbyCat(catId);
    } else {
      this.getProducts();
    }
  }


  getProductsbyCat(catId) {
    this.showLoader = true;
    this.products = this.prodService.getCollbyCat(catId);
    this.products.subscribe(() => { this.showLoader = false });
  }
  prodDetail(id) {
    this.navCtrl.navigateForward(`/product-details/${id}`)
  }
}
