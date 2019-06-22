import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from "@angular/fire/firestore";
import { first } from 'rxjs/operators';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  signIn = new FormGroup({
    email: new FormControl("", Validators.compose([
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
    ])),
    pass: new FormControl("", Validators.compose([
      Validators.required,
      Validators.minLength(6)
    ])),
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
