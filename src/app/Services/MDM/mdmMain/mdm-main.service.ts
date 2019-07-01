import { Injectable } from '@angular/core';

import { DropdownQuestion } from './../../../mdmSupport/question-dropdown';
import { QuestionBase } from './../../../mdmSupport/question-base';
import { TextboxQuestion } from './../../../mdmSupport/question-textbox';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class MdmMainService {


  constructor(
    public db: AngularFirestore,
  ) { }


  getMDMs() {
    return this.db.collection("MDMMaster").snapshotChanges();
  }
  getQuestions(collectionName) {
    
    return this.db.collection("MDMMaster").doc(collectionName).collection("fields", ref => ref.orderBy('order', 'asc')).snapshotChanges();
  }




  addDoc(mdmName, data) {
    return this.db.collection(mdmName).add(data);
  }
  getCollection(collectionName) {
    return this.db.collection(collectionName).snapshotChanges();
  }
}
