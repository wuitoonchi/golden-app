import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ApiService } from './api.service';
//import { GooglePlus } from '@ionic-native/google-plus/ngx';
//import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { UtilsService } from './utils.service';
import { LoadingController, NavController } from '@ionic/angular';
import firebase from 'firebase/app';
import { StorageService } from './storageService.service';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  dataUser: AngularFirestoreDocument<any>;
  constructor(
      //private facebook: Facebook,
      private storageService: StorageService,
      private utils: UtilsService,
      private navCtrl: NavController,
      //private googlePlus: GooglePlus,
      public ngFireAuth: AngularFireAuth,
      private api: ApiService,
      private loadingController: LoadingController,
      private db: AngularFirestore
    ) { }

    sendEmailRecovery(email):Promise<any> {
      return this.ngFireAuth.sendPasswordResetEmail(email);
    }

    sendEmailVerification(): Promise<any> {
      return this.ngFireAuth.currentUser.then(auth=>{
        auth.sendEmailVerification();
      })
    }

    loginFireAuthWithEmailAndPassword(data) {
      this.ngFireAuth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
      return this.ngFireAuth.signInWithEmailAndPassword(data.email, data.password);
    }

    signUpWithEmailAndPassword(data) {
      return new Promise((resolve, reject) => {
        this.ngFireAuth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
          this.ngFireAuth.createUserWithEmailAndPassword(data.email, data.password)
          .then(res => {
            this.setProfile(data);
            resolve(res);
          })
          .catch(err => reject(err));
      });
    }

    // async loginWithFacebook() {
    //   let loading = await this.loadingController.create({
    //     message: 'Procesando...',
    //     animated: true,
    //     spinner: 'dots',
    //     mode:'ios'
    //   });
    //   firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    //   loading.present();
    //   this.facebook.login(['public_profile','email']).then( (res: FacebookLoginResponse) => {
    //       const userToken = res.authResponse.accessToken;
    //       if(res.status=='connected') {
    //         this.ngFireAuth.signInWithCredential(firebase.auth.FacebookAuthProvider.credential(userToken))
    //         .then((data)=> {
    //           if(data) {
    //             this.storageService.setItem('authUser',{
    //               email   : data.user.email,
    //               uid     : data.user.uid,
    //               data    : data.user
    //             });
    //             this.setProfile(data).then((data)=> {
    //               this.utils.showToast('Bienvenido!');
    //               this.navCtrl.navigateRoot('home');
    //             }).catch((err)=> {
    //               this.utils.showAlert('Acceso incorrecto.');
    //               this.signOut();
    //             });
    //           } else {
    //             this.utils.showAlert('Acceso incorrecto.')
    //           }
    //         }).catch((err) => {
    //           this.utils.showAlert(err);
    //           this.utils.showAlert('Acceso incorrecto.')
    //         }).finally(()=> loading.dismiss());;
    //       }
    //     }).finally(()=> loading.dismiss());
    // }

    // async loginWithGoogle() {
    //   let loading = await this.loadingController.create({
    //     message: 'Procesando...',
    //     animated: true,
    //     spinner: 'dots',
    //     mode:'ios'
    //   });
    //   loading.present()
    //   firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    //   this.googlePlus.login({
    //         'webClientId': environment.googleWebClientId,
    //         'offline': true
    //       })
    //       .then((res:any) => {
    //         let user_data_google:any = res;
    //         console.log(user_data_google);
    //         this.ngFireAuth
    //           .signInWithCredential(
    //             firebase.auth.GoogleAuthProvider.credential(res.idToken)
    //           )
    //           .then( data => {
    //             this.storageService.setItem('authUser',{
    //               email   : data.user.email,
    //               uid     : data.user.uid,
    //               data    : data.user
    //             });
    //             this.setProfile(data).then((data)=> {
    //               this.dataUser = this.db.doc<any>('clients/' + data.firebase_uid);
    //               this.dataUser.valueChanges().subscribe((res: any) => {
    //                 if(res.phone) {
    //                   this.navCtrl.navigateRoot('home');
    //                   this.utils.showToast('Bienvenido!');
    //                 } else {
    //                   this.navCtrl.navigateRoot('auth/user-data');
    //                 }
    //               });
    //             })
    //             .catch((err)=> {
    //               this.utils.showAlert('Acceso incorrecto.'+ JSON.stringify(err));
    //               this.signOut();
    //               this.navCtrl.navigateRoot('welcome');
    //             });
    //           })
    //           .catch( error => {
    //             console.log("Firebase failure: " + JSON.stringify(error));
    //             this.utils.showAlert('Acceso incorrecto.');
    //           }).finally(()=> loading.dismiss());;
    //         })
    //       .catch((err)=> {
    //         console.log('Err Auth Google Plus',JSON.stringify(err));
    //         this.utils.showAlert('Acceso incorrecto.'+JSON.stringify(err));
    //       }).finally(()=> loading.dismiss());
    // }

    signOut() {
        this.storageService.removeItem('dataProfile');
        this.storageService.removeItem('authUser');
        this.storageService.removeItem('user');
        this.utils.disableNotifications();
        return this.ngFireAuth.signOut();
    }

    setProfile(data:any): Promise<any> {
      return this.api.httpPostToken('/auth/signup',data);
    }

    updateAccount(data) {
      return this.api.httpPostToken('/update_account',data);
    }

    get isLoggedIn(): boolean {
      const user = JSON.parse(localStorage.getItem('authUser'));
      return (user !== null) ? true : false;
    }


}
