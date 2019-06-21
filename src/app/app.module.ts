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
import { DashboardComponent } from './Components/MainMenu/dashboard/dashboard.component';
import { AuthService } from './Services/Auth/auth.service';
import { CommonService } from './Services/Common/common.service';
import { LoginComponent } from './Components/Auth/login/login.component';
import { MenuHeaderComponent } from './ExtraComps/menu-header/menu-header.component';
import { BackHeaderComponent } from './ExtraComps/back-header/back-header.component';
import { LoaderComponent } from './ExtraComps/loader/loader.component';
import { ProductsService } from './Services/products/products.service';
import { SellersService } from './Services/sellers/sellers.service';
import { UsersService } from './Services/users/users.service';
import { BannersService } from './Services/banners/banners.service';
import { BannersComponent } from './Components/MainMenu/banners/banners.component';
import { ProductsComponent } from './Components/MainMenu/products/products.component';
import { SellersComponent } from './Components/MainMenu/sellers/sellers.component';
import { UsersComponent } from './Components/MainMenu/users/users.component';
import { AddBannersComponent } from './Components/banners/add-banners/add-banners.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    MenuHeaderComponent,
    BackHeaderComponent,
    LoaderComponent,
    BannersComponent,
    ProductsComponent,
    SellersComponent,
    UsersComponent,
    AddBannersComponent,
  ],
  entryComponents: [
    MenuHeaderComponent,
    BackHeaderComponent,
    LoaderComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthService,
    CommonService,
    ProductsService,
    SellersService,
    UsersService,
    BannersService,

    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
