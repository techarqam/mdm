import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { CommonService } from '../../../../Services/Common/common.service';
import { CategoriesService } from '../../../../Services/Categories/categories.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss'],
})
export class AddCategoryComponent implements OnInit {
  name: string = 'Add Category';

  img1: any;
  img2: any;


  constructor(
    public catService: CategoriesService,
    public commonService: CommonService,
    public navCtrl: NavController,
  ) { }


  ngOnInit() { }




  UploadPic() {
    let data = this.catService.category.value;
    if (data.name) {
      if (this.img2) {
        this.catService.addCategory(data.name, this.img2).then(() => {
          this.navCtrl.navigateRoot('/categories');
        });
      } else { this.commonService.presentToast("Select an image for the Category") }
    } else { this.commonService.presentToast("Enter Name of the Category") }
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
