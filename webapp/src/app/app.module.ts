import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'
import { FlexLayoutModule } from '@angular/flex-layout'
import { NgxDatatableModule } from '@swimlane/ngx-datatable'

import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component'
import { AppService } from './app.service'
import { AppRouting } from './app.routes'

import { MenuFilterPipe, KeysPipe } from './_pipes'
import { AppMaterialModule, HttpDefaultService, DialogComponent, WsService } from './_utils'

import { LoginComponent } from 'app/login/login.component'
import { MainComponent } from 'app/main/main.component'
import { MenuComponent } from 'app/menu/menu.component'
import { NotFoundComponent } from 'app/not-found/not-found.component'
import { RoomComponent } from './dialog/room/room.component';
import { DevComponent } from './dev/dev.component';
import { EgoComponent } from 'app/ego/ego.component';


const APP_UTILS_COMPONENTS = [
  DialogComponent
]

const APP_PIPES = [
  MenuFilterPipe,
  KeysPipe
]

const APP_DIALOG_COMPONENTS = [
  DialogComponent,
  RoomComponent
]

@NgModule({
  imports: [
    ServiceWorkerModule.register('/ngsw-worker.js', {enabled: environment.production}),
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    FlexLayoutModule,
    AppMaterialModule,
    AppRouting,
    NgxDatatableModule
  ],
  declarations: [
    ...APP_UTILS_COMPONENTS,
    ...APP_PIPES,
    AppComponent,
    LoginComponent,
    EgoComponent,
    MainComponent,
    MenuComponent,
    NotFoundComponent,
    RoomComponent,
    DevComponent
  ],
  providers: [
    HttpDefaultService,
    AppService,
    WsService
  ],
  entryComponents: [
    ...APP_DIALOG_COMPONENTS
  ],
  bootstrap: [AppComponent, []]
})
export class AppModule { }
