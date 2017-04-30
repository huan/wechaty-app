import { NgModule }               from '@angular/core';
import { RouterModule, Routes }   from '@angular/router';

import { NotFoundComponent }  from './not-found/not-found.component';

import { AuthGuardService }       from './auth-guard.service';

import { AboutComponent }         from './about'
import { BotieComponent }         from './botie/botie.component'
import { LoginComponent }         from './login'

const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },

  // {
  //   path: 'admin',
  //   loadChildren: 'app/admin/admin.module#AdminModule',
  //   canLoad: [AuthGuardService]
  // },
  // {
  //   path: 'crisis-center',
  //   loadChildren: 'app/crisis-center/crisis-center.module#CrisisCenterModule',
  //   data: { preload: true }
  // },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'botie/:id'
    , component: BotieComponent
    , canActivate: [AuthGuardService]
  },

  { path: '',   redirectTo: '/about', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      // { preloadingStrategy: SelectivePreloadingStrategy }
    )
  ],
  exports: [
    RouterModule
  ],
  providers: [
  ]
})
export class AppRoutingModule { }

/*
Copyright 2017 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
