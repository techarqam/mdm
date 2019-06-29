import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './Components/MainMenu/dashboard/dashboard.component';
import { LoginComponent } from './Components/Auth/login/login.component';
import { AuthGuard } from './Guards/Auth/auth.guard';
import { BannersComponent } from './Components/MainMenu/banners/banners.component';
import { ProductsComponent } from './Components/MainMenu/products/products.component';
import { SellersComponent } from './Components/MainMenu/sellers/sellers.component';
import { UsersComponent } from './Components/MainMenu/users/users.component';
import { AddBannersComponent } from './Components/banners/add-banners/add-banners.component';
import { ViewCategoryComponent } from './Components/Categories/category/view-category/view-category.component';
import { AddCategoryComponent } from './Components/Categories/category/add-category/add-category.component';
import { ViewSubCategoryComponent } from './Components/Categories/sub-category/view-sub-category/view-sub-category.component';
import { AddSubCategoryComponent } from './Components/Categories/sub-category/add-sub-category/add-sub-category.component';
import { NegAuthGuard } from './Guards/Auth/neg-auth.guard';
import { NotificationComponent } from './Components/notifications/notification/notification.component';
import { SellerDetailComponent } from './Components/Sellers/seller-detail/seller-detail.component';
import { SettingsComponent } from './Components/Admin/settings/settings.component';
import { ProductDetailComponent } from './Components/Products/product-detail/product-detail.component';
import { BarcodeComponent } from './ExtraComps/barcode/barcode.component';
import { UserDetailComponent } from './Components/Users/user-detail/user-detail.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [NegAuthGuard]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'banners',
    component: BannersComponent,
  },
  {
    path: 'products',
    component: ProductsComponent,
  },
  {
    path: 'sellers',
    component: SellersComponent,
  },
  {
    path: 'users',
    component: UsersComponent,
  },
  {
    path: 'users-detail/:id',
    component: UserDetailComponent,
  },
  {
    path: 'add-banner',
    component: AddBannersComponent,
  },
  {
    path: 'categories',
    component: ViewCategoryComponent,
  },
  {
    path: 'add-categories',
    component: AddCategoryComponent,
  },
  {
    path: 'sub-categories/:id',
    component: ViewSubCategoryComponent,
  },
  {
    path: 'add-subCategories/:id',
    component: AddSubCategoryComponent,
  },
  {
    path: 'notifications',
    component: NotificationComponent,
  },
  {
    path: 'seller-details/:id',
    component: SellerDetailComponent,
  },
  {
    path: 'settings',
    component: SettingsComponent,
  },
  {
    path: 'product/barcode/:id',
    component: BarcodeComponent,
  },
  {
    path: 'product-details/:id',
    component: ProductDetailComponent,
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
