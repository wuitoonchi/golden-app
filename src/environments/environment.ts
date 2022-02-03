// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyC1_NYbbit92E8LM-au8YnM6PziWIlLz4M",
    authDomain: "gold-106f6.firebaseapp.com",
    projectId: "gold-106f6",
    storageBucket: "gold-106f6.appspot.com",
    messagingSenderId: "841120914714",
    appId: "1:841120914714:web:f91ea2f46fc30b8c39e0a3"
  },
  oneSignal: '82bab187-a71a-405f-8a8f-d236c623bc74',
  app: {
    name: 'Crypto Inc Gold',
    company:'Crypto Inc',
    version: '1.0.0'
  },
  api: {
    url: 'http://localhost:8000/api/v1/',
    source: 'http://localhost:8000/'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
