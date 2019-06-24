import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, AlertController } from '@ionic/angular';
import { CategoriesService } from '../../../../Services/Categories/categories.service';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-view-sub-category',
  templateUrl: './view-sub-category.component.html',
  styleUrls: ['./view-sub-category.component.scss'],
})
export class ViewSubCategoryComponent implements OnInit {
  name: string = 'Sub-Categories';

  docId;
  cat;

  subCats: Observable<any>;
  showLoader: boolean = true;


  constructor(
    private router: ActivatedRoute,
    public navCtrl: NavController,
    public catService: CategoriesService,
    private alertCtrl: AlertController,
  ) { }

  ngOnInit() {
    this.router.params.subscribe(params => {
      this.docId = params['id'];
    });
    this.getSubCat();
  }





  getSubCat() {
    this.subCats = this.catService.getSubCategories(this.docId);
    this.subCats.subscribe(() => { this.showLoader = false });
  }



  getCat() {
    this.catService.getSingleCategory(this.docId).subscribe(snap => {
      this.cat = snap.payload.data();
      this.cat.id = snap.payload.id;
    });

  }

  gtAddSubCategory() {
    this.navCtrl.navigateForward(`/add-subCategories/${this.docId}`);
  }


  async confirmDelete(subCat, id) {
    const alert = await this.alertCtrl.create({
      header: 'Delete Sub-Category ? ',
      message: 'This sub-category connot be recovered.',
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
            this.delSubCategory(subCat, id);
          }
        }
      ]
    });

    await alert.present();
  }


  delSubCategory(subCat, id) {
    subCat.id = id;
    this.catService.delSubCategories(subCat);
  }

}
