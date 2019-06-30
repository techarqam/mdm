import { Component, OnInit } from '@angular/core';
import { FaqsService } from '../../../Services/Faqs/faqs.service';
import { CommonService } from '../../../Services/Common/common.service';

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
    public commonService: CommonService,
  ) {
  }

  ngOnInit() {
    this.getVendorFaqs();
  }

  getVendorFaqs() {
    this.faqsService.getVendorFaqs().subscribe(nap => {
      this.faqs = [];
      nap.forEach(snip => {
        let temp: any = snip.payload.doc.data();
        temp.id = snip.payload.doc.id;
        this.faqs.push(temp);
      })
    })
  }

  addFaq() {
    if (this.faqsService.vendorFaqs.valid) {
      this.faqsService.addFaq(this.faqsService.vendorFaqs.value).then(() => {
        this.faqsService.vendorFaqs.reset();
        this.commonService.presentToast("Faq Added")
      });
    } else {
      this.commonService.presentToast("Faq not Valid");
    }
  }
}

