import { Component, OnInit } from '@angular/core';
import { BannersService } from '../../../Services/banners/banners.service';
import { CommonService } from '../../../Services/Common/common.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-add-banners',
  templateUrl: './add-banners.component.html',
  styleUrls: ['./add-banners.component.scss'],
})
export class AddBannersComponent implements OnInit {
  name: string = 'Add Banner';

  img1: any;
  img2: any;



  constructor(
    public bannerService: BannersService,
    public commonService: CommonService,
    public navCtrl: NavController,
  ) { }

  ngOnInit() { }



  UploadPic() {
    let data = this.bannerService.banner.value;
    if (data.name) {
      if (this.img2) {
        this.bannerService.addBanner(data.name, this.img2).then(() => {
          this.navCtrl.navigateRoot('/banners');
        });
      } else { this.commonService.presentToast("Select an image for the Banner") }
    } else { this.commonService.presentToast("Enter Name of the Banner") }
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
