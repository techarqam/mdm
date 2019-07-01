import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { MdmMainService } from 'src/app/Services/MDM/mdmMain/mdm-main.service';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { MdmControlService } from 'src/app/Services/MDM/mdmContol/mdm-control.service';
import { QuestionBase } from './../../mdmSupport/question-base';

@Component({
  selector: 'app-mdm-add-slave',
  templateUrl: './mdm-add-slave.component.html',
  styleUrls: ['./mdm-add-slave.component.scss'],
})
export class MdmAddSlaveComponent implements OnInit {

  mdmName: string;

  questions: QuestionBase<any>[] = [];
  mdmForm: FormGroup;
  constructor(
    public navParams: NavParams,
    public mdmMainService: MdmMainService,
    public mdmControl: MdmControlService,
    public modalCtrl: ModalController,
  ) {
    this.mdmName = this.navParams.get("mdmName");
    this.getQuestions();
  }

  ngOnInit() {

    this.mdmMainService.getQuestions(this.mdmName).subscribe(snap => {
      snap.forEach(snip => {
        let temp: any = snip.payload.doc.data();
        this.questions.push(temp);
      })
    });
    this.mdmForm = this.mdmControl.toFormGroup(this.questions);

  }


  getQuestions() {

  }





  onSubmit() {
    let temp = this.mdmForm.value;
    console.log(temp)
    // this.mdmMainService.addDoc(this.mdmName, temp).then(() => {
    //   this.mdmForm.reset();
    // });
  }

  close() {
    this.modalCtrl.dismiss();
  }
}
