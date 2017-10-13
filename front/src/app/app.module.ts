import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'
import { FlexLayoutModule } from '@angular/flex-layout'
import 'hammerjs';
import { NgxDatatableModule } from '@swimlane/ngx-datatable'
import { ColorPickerModule } from 'ngx-color-picker';
import { AgmCoreModule } from '@agm/core'

import { AppComponent } from './app.component'
import { AppService } from './app.service'
import { AppRouting } from './app.routes'

import { OrderByPipe, KeysPipe } from './_pipes'
import { AppMaterialModule, HttpDefaultService, DialogComponent, WsService } from './_utils'

import { LoginComponent } from 'app/login/login.component'
import { MainComponent } from 'app/main/main.component'
import { MenuComponent } from 'app/menu/menu.component'
import { NotFoundComponent } from 'app/not-found/not-found.component'
import { AdminComponent } from 'app/dialog/admin/admin.component';

const APP_UTILS_COMPONENTS = [
  DialogComponent
]

const APP_PIPES = [
  OrderByPipe,
  KeysPipe
]

const APP_DIALOG_COMPONENTS = [
  DialogComponent,
  AdminComponent
]

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    FlexLayoutModule,
    AppMaterialModule,
    AppRouting,
    NgxDatatableModule,
    ColorPickerModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCn5M684ZDoTqQwaoZxMTasOlo7uuVvQ7E',
      libraries: ['places']
    }),
  ],
  declarations: [
    ...APP_UTILS_COMPONENTS,
    ...APP_PIPES,
    AppComponent,
    LoginComponent,
    MainComponent,
    MenuComponent,
    NotFoundComponent,
    AdminComponent 
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
