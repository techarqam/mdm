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

  mdmData: Array<any> = [];
  fields: Array<any> = [];

  constructor(
    private router: ActivatedRoute,
    public mdmService: MdmMainService,
    public modalCtrl: ModalController,
  ) {
  }


  ngOnInit() {
    this.router.params.subscribe(params => {
      this.mdmName = params['id'];
      this.getFields(params['id']);
      this.getData();
    });
  }

  getFields(mdmName) {
    this.mdmService.getFields(mdmName).subscribe(snap => {
      this.fields = snap;
    })
  }


  getData() {
    this.mdmService.getCollection(this.mdmName).subscribe(snap => {
      snap.forEach(snip => {
        let temp: any = snip.payload.doc.data();
        temp.id = snip.payload.doc.id;
        this.mdmData.push(temp);
      })
    });
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
