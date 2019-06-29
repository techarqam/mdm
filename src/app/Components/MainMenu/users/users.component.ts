import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UsersService } from '../../../Services/users/users.service';
import { MenuController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {

  name: string = 'Users';

  users: Observable<any>;
  showLoader: boolean = true;

  constructor(
    public userService: UsersService,
    public menuCtrl: MenuController,
    public navCtrl: NavController,
  ) {
    this.menuCtrl.enable(true);
  }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.users = this.userService.getUsers();
    this.users.subscribe(() => { this.showLoader = false });
  }

  userDetails(id) {
    this.navCtrl.navigateForward(`users-detail/${id}`)
  }

}
