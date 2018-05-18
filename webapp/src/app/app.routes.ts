import { ModuleWithProviders } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { MainComponent } from 'app/main/main.component';
import { LoginComponent } from 'app/login/login.component';
import { DevComponent } from 'app/dev/dev.component';
import { EgoComponent } from 'app/ego/ego.component';


const APP_ROUTES: Routes = [
  
  {
    path: '',
    redirectTo: 'ego',
    pathMatch: 'full'
  },
  {
    path: 'ego',
    component: EgoComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'main',
    component: MainComponent
  },
  {
    path: 'dev',
    component: DevComponent
  }
  /*,
  {
    path: '**',
    component: NotFoundComponent
  },*/
]

export const AppRouting: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES)
