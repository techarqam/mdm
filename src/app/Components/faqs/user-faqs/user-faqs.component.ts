import { Component, OnInit } from '@angular/core';
import { FaqsService } from '../../../Services/Faqs/faqs.service';
import { CommonService } from '../../../Services/Common/common.service';

@Component({
  selector: 'app-user-faqs',
  templateUrl: './user-faqs.component.html',
  styleUrls: ['./user-faqs.component.scss'],
})
export class UserFaqsComponent implements OnInit {
  name: string = "User Faq's"
  faqs: Array<any> = [];
  constructor(
    public faqsService: FaqsService,
    public commonService: CommonService,
  ) {
    this.getUserFaqs();
  }

  ngOnInit() { }

  getUserFaqs() {
    this.faqsService.getUserFaqs().subscribe(nap => {
      this.faqs = [];
      nap.forEach(snip => {
        let temp: any = snip.payload.doc.data();
        temp.id = snip.payload.doc.id;
        this.faqs.push(temp);
      })
    })
  }

  addFaq() {
    if (this.faqsService.userFaqs.valid) {
      this.faqsService.addFaq(this.faqsService.userFaqs.value).then(() => {
        this.faqsService.userFaqs.reset();
        this.commonService.presentToast("Faq Added")
      });
    } else {
      this.commonService.presentToast("Faq not Valid");
    }
  }
}
