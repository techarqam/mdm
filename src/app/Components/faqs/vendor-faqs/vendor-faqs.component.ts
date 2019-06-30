import { Component, OnInit } from '@angular/core';
import { FaqsService } from '../../../Services/Faqs/faqs.service';
import { CommonService } from '../../../Services/Common/common.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-vendor-faqs',
  templateUrl: './vendor-faqs.component.html',
  styleUrls: ['./vendor-faqs.component.scss'],
})
export class VendorFaqsComponent implements OnInit {

  name: string = "Vendor Faq's"
  faqs: Array<any> = [];
  showLoader: boolean = true;
  constructor(
    public faqsService: FaqsService,
    public alertCtrl: AlertController,
    public commonService: CommonService,
  ) {
  }

  ngOnInit() {
    this.getVendorFaqs();
  }

  getVendorFaqs() {
    this.showLoader = true;
    this.faqsService.getVendorFaqs().subscribe(nap => {
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
    this.faqsService.vendorFaqs.patchValue({ userType: "Vendor" })
    if (this.faqsService.vendorFaqs.valid) {
      this.faqsService.addFaq(this.faqsService.vendorFaqs.value).then(() => {
        this.faqsService.vendorFaqs.reset();
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

