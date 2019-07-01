import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { firebaseConfig } from './firebaseConfig';
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireAuthModule } from '@angular/fire/auth';
import { ReactiveFormsModule } from "@angular/forms";
import { MdmMasterComponent } from './Components/mdm-master/mdm-master.component';
import { MdmMainService } from './Services/MDM/mdmMain/mdm-main.service';
import { MdmControlService } from './Services/MDM/mdmContol/mdm-control.service';
import { MdmSlaveComponent } from './Components/mdm-slave/mdm-slave.component';
import { BackHeaderComponent } from './ExtraComps/back-header/back-header.component';
import { MdmAddSlaveComponent } from './Components/mdm-add-slave/mdm-add-slave.component';
@NgModule({
  declarations: [
    AppComponent,
    MdmMasterComponent,
    MdmSlaveComponent,
    BackHeaderComponent,
    MdmAddSlaveComponent,
  ],
  entryComponents: [
    BackHeaderComponent,
    MdmAddSlaveComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule.enablePersistence(),
    AngularFireAuthModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    MdmMainService,
    MdmControlService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
