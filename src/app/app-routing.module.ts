import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { MdmMasterComponent } from './Components/mdm-master/mdm-master.component';
import { MdmSlaveComponent } from './Components/mdm-slave/mdm-slave.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'mdm-master',
    pathMatch: 'full'
  },
  {
    path: 'mdm-master',
    component: MdmMasterComponent,
  },
  {
    path: "mdm-slave/:id",
    component: MdmSlaveComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
