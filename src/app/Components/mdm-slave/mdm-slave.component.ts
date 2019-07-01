import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MdmMainService } from 'src/app/Services/MDM/mdmMain/mdm-main.service';
import { Observable } from 'rxjs';
import { ModalController } from '@ionic/angular';
import { MdmAddSlaveComponent } from '../mdm-add-slave/mdm-add-slave.component';

@Component({
  selector: 'app-mdm-slave',
  templateUrl: './mdm-slave.component.html',
  styleUrls: ['./mdm-slave.component.scss'],
})
export class MdmSlaveComponent implements OnInit {

  mdmName: string;

  mdmObservable: Observable<any>;

  constructor(
    private router: ActivatedRoute,
    public mdmService: MdmMainService,
    public modalCtrl: ModalController,
  ) { }


  ngOnInit() {
    this.router.params.subscribe(params => {
      this.mdmName = params['id'];
      this.getData();
    });
  }

  getData() {
    this.mdmObservable = this.mdmService.getCollection(this.mdmName);
    this.mdmService.getCollection(this.mdmName).subscribe(snap => {
      snap.forEach(snip => {
        console.log(snip.payload.doc.data())
      })
    })
  }





  async addMDM() {
    const modal = await this.modalCtrl.create({
      component: MdmAddSlaveComponent,
      componentProps: {
        mdmName: this.mdmName
      }
    });
    return await modal.present();
  }




}
