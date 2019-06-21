import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, } from '@angular/router';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';
import { AuthService } from 'src/app/Services/Auth/auth.service';
import { CommonService } from 'src/app/Services/Common/common.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService,
    public commonService: CommonService,
    public db: AngularFirestore,
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {

    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged((user: firebase.User) => {
        if (user) {
          this.db.doc(`/Admins/${user.uid}`).get().subscribe(snap => {
            if (snap.exists) {
              resolve(true);
            } else {
              this.authService.logout();
              this.commonService.presentToast("You are not an Admin");
              resolve(false)
            }
          })
        } else {
          this.router.navigate(['/login']);
          resolve(false);
        }
      });
    });

  }
}