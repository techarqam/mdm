import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { UsersService } from '../../../Services/users/users.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit {

  docId;
  user;
  cart: Observable<any>;
  orders: Observable<any>;
  showLoader: boolean = false;
  name: string = "User Details";
  constructor(
    private router: ActivatedRoute,
    public userService: UsersService,
    public navCtrl: NavController,
  ) { }

  ngOnInit() {
    this.router.params.subscribe(params => {
      this.docId = params['id'];
    });
    this.getUser();
    this.getCart();
    this.getOrders();
  }

  getUser() {
    this.showLoader = true;
    this.userService.getSingleUser(this.docId).subscribe(snap => {
      this.user = snap.payload.data();
      this.showLoader = false;
    })
  }

  getCart() {
    this.cart = this.userService.getCart(this.docId);
  }
  getOrders() {
    this.orders = this.userService.getCart(this.docId);
  }
  gtProduct(prodId) {
    this.navCtrl.navigateForward(`product-details/${prodId}`)
  }
}
