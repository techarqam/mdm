import { Injectable } from '@angular/core';
import { CommonService } from '../Common/common.service';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {


  category = new FormGroup({
    name: new FormControl("", Validators.compose([
      Validators.required,
      Validators.minLength(4)
    ])),
    imageUrl: new FormControl(""),
    timeStamp: new FormControl(moment().format()),
  });
  subCategory = new FormGroup({
    name: new FormControl("", Validators.compose([
      Validators.required,
      Validators.minLength(4)
    ])),
    imageUrl: new FormControl(""),
    category: new FormControl("", Validators.compose([
      Validators.required,
    ])),
    timeStamp: new FormControl(moment().format()),
  });

  constructor(
    public firestore: AngularFirestore,
    public commonService: CommonService,
  ) {

  }


  // Categories
  addCategory(catName, catImg) {
    return firebase.storage().ref("Categories/" + catName).put(catImg).then(() => {
      firebase.storage().ref("Categories/" + catName).getDownloadURL().then((dURL) => {
        this.category.setValue({ name: catName, imageUrl: dURL, timeStamp: moment().format() })
      }).then(() => {
        this.firestore.collection(`Categories`).add(this.category.value).then(() => {
          this.category.reset();
          this.commonService.presentToast("Category Added");
        });
      })
    })
  }

  getCategories() {
    return this.firestore.collection('Categories', ref => ref.orderBy("name")).snapshotChanges();
  }


  delCategories(cat) {
    return firebase.storage().ref("Categories/").child(cat.name).delete().then(() => {
      this.firestore.collection(`Categories`).doc(cat.id).delete().then(() => {
        this.commonService.presentToast("Category Deleted");
      })
    });
  }


  // Sub Categories

  getSingleCategory(id) {
    return this.firestore.doc(`Categories/${id}`).snapshotChanges();
  }

  addSubCategory(subCatName, subCatImg, cat) {
    return firebase.storage().ref("SubCategories/" + subCatName).put(subCatImg).then(() => {
      firebase.storage().ref("SubCategories/" + subCatName).getDownloadURL().then((dURL) => {
        this.subCategory.setValue({ name: subCatName, imageUrl: dURL, category: cat, timeStamp: moment().format() })
      }).then(() => {
        this.firestore.collection(`SubCategories`).add(this.subCategory.value).then(() => {
          this.subCategory.reset();
          this.commonService.presentToast("Sub-Category Added");
        });
      })
    })
  }

  getSubCategories(cat) {
    return this.firestore.collection('SubCategories', ref => ref.orderBy("name").where("category", "==", cat)).snapshotChanges();
  }


  delSubCategories(cat) {
    return firebase.storage().ref("SubCategories/").child(cat.name).delete().then(() => {
      this.firestore.collection(`SubCategories`).doc(cat.id).delete().then(() => {
        this.commonService.presentToast("Sub-Category Deleted");
      })
    });
  }

}
