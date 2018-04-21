import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'
import { enableProdMode } from '@angular/core'
import { environment } from './environments/environment'
import { AppModule } from './app/app.module'
import * as firebase from 'firebase'

const config = {
  apiKey: "AIzaSyDg-Zqke9mFG95EFjSDpXFmdSNC7Zh2_qY",
  authDomain: "thecarabistouille.firebaseapp.com",
  databaseURL: "https://thecarabistouille.firebaseio.com",
  projectId: "thecarabistouille",
  storageBucket: "thecarabistouille.appspot.com",
  messagingSenderId: "229462910372"
}
firebase.initializeApp(config);

if (environment.production) {
  enableProdMode()
}

platformBrowserDynamic().bootstrapModule(AppModule)
