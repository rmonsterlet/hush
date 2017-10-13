import { ModuleWithProviders } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { MainComponent } from './main'
import { NotFoundComponent } from './not-found'
import { LoginComponent } from './login'

const APP_ROUTES: Routes = [
  
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'main',
    component: MainComponent
  }
  
  /*
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: MainComponent
  }
  */
  /*,
  {
    path: '**',
    component: NotFoundComponent
  },*/
]

export const AppRouting: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES)
