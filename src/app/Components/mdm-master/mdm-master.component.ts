import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MdmMainService } from '../../Services/MDM/mdmMain/mdm-main.service';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { NavController } from '@ionic/angular';
import * as moment from 'moment';

@Component({
  selector: 'app-mdm-master',
  templateUrl: './mdm-master.component.html',
  styleUrls: ['./mdm-master.component.scss'],
})
export class MdmMasterComponent implements OnInit {

  mdms: Observable<any>;


  constructor(
    public mdmMainService: MdmMainService,
    public db: AngularFirestore,
    public navCtrl: NavController,
  ) {
    // this.createMDMConfig();
  }

  ngOnInit() {
    this.mdms = this.mdmMainService.getMDMs();
  }

  gtSlave(id) {
    this.navCtrl.navigateForward(`mdm-slave/${id}`);
  }


  // questions: QuestionBase<any>[] = [];


  // createMDMConfig() {
  //   vendorModal.forEach(snip => {
  //     this.db.collection("MDMMaster").doc(this.collectionName).set({ timestamp: moment().format() }).then(() => {
  //       this.db.collection("MDMMaster").doc(this.collectionName).collection("fields").add(snip)
  //     })
  //   })
  // }





}
