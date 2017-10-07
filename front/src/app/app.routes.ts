import { ModuleWithProviders } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { ContactComponent } from './contact'
import { NotFoundComponent } from './not-found'
import { PreferencesComponent } from './preferences'

const APP_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'preferences',
    pathMatch: 'full'
  },
  {
    path: 'preferences',
    component: PreferencesComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  }/*,
  {
    path: '**',
    component: NotFoundComponent
  },*/
]

export const AppRouting: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES)
