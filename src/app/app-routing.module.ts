import { PagenotfoundComponent } from './shared/components/pagenotfound/pagenotfound.component';

import { AdminModule } from './admin/admin.module';
import { UserModule } from './user/user.module';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => UserModule
  },

  {
    path: 'admin',
    loadChildren: () => AdminModule
  },
  {
    path: '404',
    component: PagenotfoundComponent
  },
  {
    path: '**',
    redirectTo: '/404'
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
