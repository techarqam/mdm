import { Component, OnInit } from '@angular/core';
import { FaqsService } from '../../../Services/Faqs/faqs.service';
import { CommonService } from '../../../Services/Common/common.service';
import { AlternativeServiceOptions } from 'http2';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-user-faqs',
  templateUrl: './user-faqs.component.html',
  styleUrls: ['./user-faqs.component.scss'],
})
export class UserFaqsComponent implements OnInit {
  name: string = "User Faq's"
  faqs: Array<any> = [];
  showLoader: boolean = false;
  constructor(
    public faqsService: FaqsService,
    public commonService: CommonService,
    public alertCtrl: AlertController,
  ) {
    this.getUserFaqs();
  }

  ngOnInit() { }

  getUserFaqs() {
    this.showLoader = true;
    this.faqsService.getUserFaqs().subscribe(nap => {
      this.faqs = [];
      nap.forEach(snip => {
        let temp: any = snip.payload.doc.data();
        temp.id = snip.payload.doc.id;
        this.faqs.push(temp);
      })
    })
    this.showLoader = false;
  }

  addFaq() {
    this.faqsService.userFaqs.patchValue({userType : "User"})
    if (this.faqsService.userFaqs.valid) {
      this.faqsService.addFaq(this.faqsService.userFaqs.value).then(() => {
        this.faqsService.userFaqs.reset();
        this.commonService.presentToast("Faq Added")
      });
    } else {
      this.commonService.presentToast("Faq not Valid");
    }
  }

  async confirmDelete(id) {
    const alert = await this.alertCtrl.create({
      header: 'Delete FAQ ? ',
      message: 'This faq connot be recovered.',
      buttons: [
        {
          text: 'No, Its a mistake',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text: 'Yes, I understand',
          handler: () => {
            this.faqsService.delFaq(id);
          }
        }
      ]
    });

    await alert.present();
  }


}
