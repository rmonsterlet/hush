import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'
import { enableProdMode } from '@angular/core'
import { environment } from './environments/environment'
import { AppModule } from './app/app.module'
import * as firebase from 'firebase'

const config = {
  apiKey: "AIzaSyCKgs4qkCqcCKRbNxK6LdxtmyqnvOxSICw",
  authDomain: "amen-cf01b.firebaseapp.com",
  databaseURL: "https://amen-cf01b.firebaseio.com",
  projectId: "amen-cf01b",
  storageBucket: "amen-cf01b.appspot.com",
  messagingSenderId: "839573369133"
}
firebase.initializeApp(config);

if (environment.production) {
  enableProdMode()
}

platformBrowserDynamic().bootstrapModule(AppModule)
