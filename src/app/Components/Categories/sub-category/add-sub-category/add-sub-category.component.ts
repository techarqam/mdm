import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, AlertController } from '@ionic/angular';
import { CategoriesService } from '../../../../Services/Categories/categories.service';
import { CommonService } from '../../../../Services/Common/common.service';

@Component({
  selector: 'app-add-sub-category',
  templateUrl: './add-sub-category.component.html',
  styleUrls: ['./add-sub-category.component.scss'],
})
export class AddSubCategoryComponent implements OnInit {

  docId;

  img1: any;
  img2: any;


  constructor(
    private router: ActivatedRoute,
    public navCtrl: NavController,
    public catService: CategoriesService,
    public commonService: CommonService,
    private alertCtrl: AlertController,
  ) { }

  ngOnInit() {
    this.router.params.subscribe(params => {
      this.docId = params['id'];
    });
  }

  UploadPic() {
    let data = this.catService.subCategory.value;
    if (data.name) {
      if (this.img2) {
        this.catService.addSubCategory(data.name, this.img2, this.docId).then(() => {
          this.navCtrl.navigateRoot(`/sub-categories/${this.docId}`);
        });
      } else { this.commonService.presentToast("Select an image for the Sub-Category") }
    } else { this.commonService.presentToast("Enter Name of the Sub-Category") }
    // console.log(data);
  }


  fileChange(event) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();

      reader.onload = (event: any) => {
        this.img1 = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
    let fileList: FileList = event.target.files;
    let file: File = fileList[0];
    this.img2 = file;
  }


  removeImage() {
    this.img1 = null;
  }



}
