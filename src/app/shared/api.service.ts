import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { StorageService } from './storageService.service';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  lang: string = 'en';
  constructor(
    public http: HttpClient,
    private localStorageService: StorageService,
    private auth: AngularFireAuth
  ) {
    this.localStorageService.getItem('dataProfile').subscribe((data: any) => {
      if(data) {
        this.lang = data.lang;
      } else {
        this.lang = 'en';
      }
    })
  }

  getApiHost(){
    return environment.api;
  }

  getSourceHost(){
    return environment.api.url;
  }

  httpGet(url): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        lang: this.lang
      })
    };
    const promise = new Promise((resolve, reject) => {
      this.http.get(this.getApiHost() + url,httpOptions).subscribe(data => {
        resolve(data)
      },error=>{
        reject(error);
      });
    })
    return promise;
  }

  httpPost(url, data) {
    const promise = new Promise((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          lang: this.lang
        })
      };
      this.http.post(this.getApiHost() + url, JSON.stringify(data), httpOptions).subscribe(data => {
        resolve(data)
      },error=>{
        reject(error);
      });
    })
    return promise;
  }

  httpGetToken(url): Promise<any> {
    var promise = new Promise((resolve,reject)=>{
      firebase.auth().currentUser.getIdToken(true).then((token)=> {
        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type':  'application/json',
            Authorization: 'Bearer ' + token,
            lang: this.lang
          })
        };
        this.http.get(this.getApiHost()+"/"+environment.app+url,httpOptions).subscribe(data=>{
            resolve(data)
          },error=> {
            reject(error);
          });
      }).catch((err)=>{
        reject(err);
      })
    })
    return promise;
  }

  httpPostToken(url, data) {
      var promise = new Promise((resolve,reject)=>{
          firebase.auth().currentUser.getIdToken(true).then((token) => {
            const httpOptions = {
              headers: new HttpHeaders({
                'Content-Type':  'application/json',
                Authorization: 'Bearer ' + token,
                lang: this.lang
              })
            };
            this.http.post(this.getApiHost()+"/"+environment.app+url,data,httpOptions).subscribe(data=>{
              resolve(data)
            },error=>{
              reject(error);
            });
        }).catch((err)=>{
          reject(false);
        });
      });
      return promise;
  }

  httpGetTokenCustome(url): Promise<any> {
    const promise = new Promise((resolve,reject)=>{
      firebase.auth().currentUser.getIdToken(true).then((token)=> {
        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type':  'application/json',
            Authorization: 'Bearer ' + token,
            lang: this.lang
          })
        };
        this.http.get(this.getApiHost()+ '/' + url, httpOptions).subscribe(data => {
            resolve(data)
          },error=> {
            reject(error);
          });
      }).catch((err) => {
        reject(err);
      })
    })
    return promise;
  }

  httpPostTokenCustome(url, data) {
      const promise = new Promise((resolve, reject) => {
        firebase.auth().currentUser.getIdToken(true).then((token) => {
            const httpOptions = {
              headers: new HttpHeaders({
                'Content-Type':  'application/json',
                Authorization: 'Bearer ' + token,
                lang: this.lang
              })
             };
            this.http.post(this.getApiHost() + '/' + url, data, httpOptions).subscribe( data => {
              resolve(data)
            }, error => {
              reject(error);
            });
        }).catch((err) => {
          reject(false);
        });
      });
      return promise;
  }
}
