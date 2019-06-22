import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SellersService } from '../../../Services/sellers/sellers.service';

@Component({
  selector: 'app-seller-detail',
  templateUrl: './seller-detail.component.html',
  styleUrls: ['./seller-detail.component.scss'],
})
export class SellerDetailComponent implements OnInit {

  docId;
  seller;
  showLoader: boolean = false;

  constructor(
    private router: ActivatedRoute,
    public sellerService: SellersService,
  ) { }

  ngOnInit() {
    this.router.params.subscribe(params => {
      this.docId = params['id'];
    });
    this.getSeller();
  }


  getSeller() {
    this.showLoader = true;
    this.sellerService.getSingleSeller(this.docId).subscribe(snap => {
      this.seller = snap.payload.data();
      this.seller.id = snap.payload.id;
      this.showLoader = false;
    });
  }

}
