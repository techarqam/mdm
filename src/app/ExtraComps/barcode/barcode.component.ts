import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../Services/products/products.service';

@Component({
  selector: 'app-barcode',
  templateUrl: './barcode.component.html',
  styleUrls: ['./barcode.component.scss'],
})
export class BarcodeComponent implements OnInit {
  name: string = 'Product Barcode';
  docId;
  product;
  showLoader: boolean = false;
  createdCode = null;

  constructor(
    private router: ActivatedRoute,
    public prodService: ProductsService,
  ) { }

  ngOnInit() {
    this.router.params.subscribe(params => {
      this.docId = params['id'];
    });
    this.getProduct();
  }


  getProduct() {
    this.showLoader = true;
    this.prodService.getSingleProduct(this.docId).subscribe(snap => {
      this.product = snap.payload.data();
      this.createdCode = snap.payload.id;
      this.showLoader = false;
    });
  }
  pBar() {
    window.print();
  }

}
