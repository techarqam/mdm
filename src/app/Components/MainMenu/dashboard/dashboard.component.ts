import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { BannersService } from '../../../Services/banners/banners.service';
import { ProductsService } from '../../../Services/products/products.service';
import { SellersService } from '../../../Services/sellers/sellers.service';
import { UsersService } from '../../../Services/users/users.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  banners: number = 0;
  products: number = 0;
  orders: number = 0;
  sellers: number = 0;
  users: number = 0;

  constructor(
    public menuCtrl: MenuController,
    public bannersService: BannersService,
    public prodService: ProductsService,
    public sellerService: SellersService,
    public userService: UsersService,

  ) {
    this.menuCtrl.enable(true);
  }

  ngOnInit() {
    this.getBanners();
    this.getProducts();
    this.getSellers();
    this.getUsers();
  }



  async getBanners() {
    this.bannersService.getBanners().subscribe(snap => {
      this.banners = snap.length;
    })
  }
  async getProducts() {
    this.prodService.getProducts().subscribe(snap => {
      this.products = snap.length;
    })
  }
  async getOrders() {
    // this..getOrders().subscribe(snap => {
    //   this.banners = snap.length;
    // })
  }
  async getSellers() {
    this.sellerService.getSellers().subscribe(snap => {
      this.sellers = snap.length;
    })
  }
  async getUsers() {
    this.userService.getUsers().subscribe(snap => {
      this.users = snap.length;
    })
  }

}
