import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { QuestionBase } from './../../mdmSupport/question-base';
import { MdmMainService } from '../../Services/MDM/mdmMain/mdm-main.service';
import { MdmControlService } from '../../Services/MDM/mdmContol/mdm-control.service';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { NavController } from '@ionic/angular';
import { userModal } from '../../Modals/userModal';
import { vendorModal } from '../../Modals/vendorModal';
import * as moment from 'moment';
@Component({
  selector: 'app-mdm-master',
  templateUrl: './mdm-master.component.html',
  styleUrls: ['./mdm-master.component.scss'],
})
export class MdmMasterComponent implements OnInit {

  mdms: Observable<any>;

  collectionName = "vendors";

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


  createMDMConfig() {
    vendorModal.forEach(snip => {
      this.db.collection("MDMMaster").doc(this.collectionName).set({ timestamp: moment().format() }).then(() => {
        this.db.collection("MDMMaster").doc(this.collectionName).collection("fields").add(snip)
      })
    })
  }



  // onSubmit() {
  //   let temp = this.mdmForm.value;
  //   this.mdmMainService.addDoc(this.collectionName, temp).then(() => {
  //     this.mdmForm.reset();
  //   });
  // }


  // mdmForm: FormGroup;
  // collectionName = "Vendors";
  // collectionList: Observable<any>;

  // questions: Array<any> = [];

  // mdalQues: Array<any> = [
  //   {
  //     key: "storeName",
  //     controlType: "textbox",
  //     label: 'Store Name',
  //     value: '',
  //     type: 'text',
  //     required: true,
  //     order: 1,
  //   },
  //   {
  //     key: "ownerName",
  //     controlType: "textbox",
  //     label: 'Owner Name',
  //     value: '',
  //     type: 'text',
  //     required: true,
  //     order: 2,
  //   },
  //   {
  //     key: "phone",
  //     controlType: "textbox",
  //     label: 'Phone Number',
  //     value: '',
  //     type: 'number',
  //     required: true,
  //     order: 3,
  //   },
  //   {
  //     key: "Address",
  //     controlType: "textarea",
  //     label: 'Password',
  //     value: '',
  //     type: 'textarea',
  //     required: true,
  //     order: 4,
  //   }
  // ]


}
