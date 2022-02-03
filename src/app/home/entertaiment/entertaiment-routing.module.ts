import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EntertaimentPage } from './entertaiment.page';

const routes: Routes = [
  {
    path: '',
    component: EntertaimentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EntertaimentPageRoutingModule {}
