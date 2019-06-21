import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from "@angular/fire/firestore";
import { first } from 'rxjs/operators';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  signIn = new FormGroup({
    email: new FormControl(""),
    pass: new FormControl(""),
  });



  constructor(
    private fireAuth: AngularFireAuth,
    private firestore: AngularFirestore,
  ) { }


  isLoggedIn() {
    return this.fireAuth.authState.pipe(first())
  }

  loginM(data) {
    return new Promise<any>((resolve, reject) => {
      this.fireAuth.auth.signInWithEmailAndPassword(data.email, data.pass).then(res => { }, err => reject(err));
    });
  }





  logout() {
    return this.fireAuth.auth.signOut();
  }
}
