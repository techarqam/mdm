import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../../Services/Common/common.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { tap } from 'rxjs/operators';
import { AuthService } from '../../../Services/Auth/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  name: string = 'Settings';
  admin;
  settings;
  showLoader: boolean = false;
  editSettings: boolean = false;
  constructor(
    public commonService: CommonService,
    public authService: AuthService,
    // public db: AngularFirestore,
  ) {
    this.getSettings();
    // this.getAdmin();

  }

  ngOnInit() {
  }

  // getAdmin() {
  //   this.showLoader = true;
  //   this.authService.isLoggedIn().pipe(
  //     tap(user => {
  //       if (user) {
  //         console.log(user.uid);
  //         this.commonService.getAdmin(user.uid).subscribe(snap => {
  //           this.admin = snap.payload.data();
  //           console.log(this.admin);
  //           this.showLoader = true;
  //         })
  //       }
  //     })
  //   )
  // }
  getSettings() {
    this.showLoader = true;
    this.commonService.getSettings().subscribe(snap => {
      this.settings = snap.payload.data();
      this.showLoader = false;
    })
  }

  editSettingsFun() {
    this.commonService.settings.setValue(this.settings);
    if (this.commonService.settings.valid) {
      this.editSettings = true;
    } else {
      this.commonService.presentToast("Error Occured. Settings cannot be edited");
    }
  }

  onSubmit() {
    if (this.commonService.settings.valid) {
      this.commonService.updateSettings(this.commonService.settings.value).then(() => {
        this.cancel();
      })
    } else {
      this.commonService.presentToast("Settings are not Valid");
    }
  }
  cancel() {
    this.commonService.settings.reset();
    this.editSettings = false;
  }
}
