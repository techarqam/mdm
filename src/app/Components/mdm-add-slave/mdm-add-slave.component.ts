import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { MdmMainService } from 'src/app/Services/MDM/mdmMain/mdm-main.service';
import { FormGroup, FormControl, Validators, FormGroupDirective, FormBuilder } from '@angular/forms';
import { CommonServiceService } from '../../Services/CommonService/common-service.service';

@Component({
  selector: 'app-mdm-add-slave',
  templateUrl: './mdm-add-slave.component.html',
  styleUrls: ['./mdm-add-slave.component.scss'],
})
export class MdmAddSlaveComponent implements OnInit {

  mdmName: string;

  questions: Array<any> = [];
  mdmForm: FormGroup;
  constructor(
    public navParams: NavParams,
    public mdmMainService: MdmMainService,
    public modalCtrl: ModalController,
    public fb: FormBuilder,
    public commonService: CommonServiceService,
  ) {
    this.mdmName = this.navParams.get("mdmName");
  }

  ngOnInit() {
    let group: any = {};
    this.mdmMainService.getFields(this.mdmName).subscribe(snap => {
      this.questions = snap;
      this.questions.forEach(question => {
        let valArr: Array<any> = [];
        if (question.required) { valArr.push(Validators.required); }
        if (question.pattern) { valArr.push(Validators.pattern(question.pattern)); }
        if (question.minLength) { valArr.push(Validators.minLength(question.minLength)); }
        if (question.maxLength) { valArr.push(Validators.maxLength(question.maxLength)); }
        group[question.key] =
          question.required ?
            new FormControl(question.value || '', Validators.compose(valArr))
            : new FormControl(question.value || '');



      });
      this.mdmForm = this.fb.group(group);
    });
  }




  onSubmit() {
    let temp = this.mdmForm.value;
    if (this.mdmForm.valid) {
      this.mdmMainService.addDoc(this.mdmName, temp).then(() => {
        this.close();
        this.mdmForm.reset();
      });
    } else {
      console.log(this.mdmForm.value)
      this.commonService.presentToast("Try again");
    }
  }

  close() {
    this.modalCtrl.dismiss();
  }
}
