import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../../../Services/Categories/categories.service';
import { NavController, AlertController } from '@ionic/angular';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-view-category',
  templateUrl: './view-category.component.html',
  styleUrls: ['./view-category.component.scss'],
})
export class ViewCategoryComponent implements OnInit {

  cats: Observable<any>;

  showLoader: boolean = true;

  constructor(
    public navCtrl: NavController,
    public catService: CategoriesService,
    private alertCtrl: AlertController,

  ) { }

  ngOnInit() {
    this.getCategories();
  }

  gtAddCategory() {
    this.navCtrl.navigateForward('/add-categories')
  }



  getCategories() {
    this.cats = this.catService.getCategories();
    this.cats.subscribe(() => { this.showLoader = false });
  }


  async confirmDelete(cat, id) {
    const alert = await this.alertCtrl.create({
      header: 'Delete Category ? ',
      message: 'This category connot be recovered.',
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
            this.delCategory(cat, id);
          }
        }
      ]
    });

    await alert.present();
  }


  delCategory(cat, id) {
    cat.id = id;
    this.catService.delCategories(cat);
  }

  viewSubCats(docId) {
    this.navCtrl.navigateForward(`/sub-categories/${docId}`)
  }
}
