import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ComponentsModule } from './components/components.module';
import { StorageService } from './shared/storageService.service';
import { BackgroundMode } from '@awesome-cordova-plugins/background-mode/ngx';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { Camera } from '@awesome-cordova-plugins/camera/ngx';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
import { IonIntlTelInputModule } from 'ion-intl-tel-input';
import { OneSignal } from '@awesome-cordova-plugins/onesignal/ngx';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './shared/api.service';
import { AuthService } from './shared/auth.service';
import { UtilsService } from './shared/utils.service';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ComponentsModule,
    IonIntlTelInputModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  providers:
  [
    OneSignal,
    Camera,
    Geolocation,
    StorageService,
    BackgroundMode,
    //Facebook,
    //GooglePlus,
    InAppBrowser,
    SocialSharing,
    ApiService,
    AuthService,
    UtilsService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
