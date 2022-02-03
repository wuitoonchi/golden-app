import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EntertaimentPageRoutingModule } from './entertaiment-routing.module';

import { EntertaimentPage } from './entertaiment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EntertaimentPageRoutingModule
  ],
  declarations: [EntertaimentPage]
})
export class EntertaimentPageModule {}
