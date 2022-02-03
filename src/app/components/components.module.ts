import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocialAuthComponent } from './social-auth/social-auth.component';



@NgModule({
  declarations: [
    SocialAuthComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SocialAuthComponent
  ]
})
export class ComponentsModule { }
