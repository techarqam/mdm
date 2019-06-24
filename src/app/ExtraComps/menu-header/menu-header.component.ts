import { Component, OnInit, Input } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { NotificationPopComponent } from '../../Components/notifications/notification-pop/notification-pop.component';

@Component({
  selector: 'app-menu-header',
  templateUrl: './menu-header.component.html',
  styleUrls: ['./menu-header.component.scss'],
})
export class MenuHeaderComponent implements OnInit {
  @Input() name: string;


  constructor(
    public popoverController: PopoverController,
  ) { }

  ngOnInit() { }

  async presentNotifications(ev: any) {
    const popover = await this.popoverController.create({
      component: NotificationPopComponent,
      event: ev,
      translucent: true
    });
    return await popover.present();
  }
}
