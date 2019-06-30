import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.scss'],
})
export class FaqsComponent implements OnInit {

  constructor(
    public navCtrl: NavController,
  ) { }

  ngOnInit() { }

  gtUsers() {
    this.navCtrl.navigateForward('user-faqs')
  }

  gtVendors() {
    this.navCtrl.navigateForward('vendor-faqs')
  }

}
