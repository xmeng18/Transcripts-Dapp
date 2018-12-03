import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnectComponent } from './connect/connect.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';
import { ApplicationFormComponent } from './application-form/application-form.component';
import { ApplicationListComponent } from './application-list/application-list.component';
import { ApplicationViewComponent } from './application-view/application-view.component';

const appRoutes: Routes = [
  {
    path: 'connect',
    component: ConnectComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'application',
    component: ApplicationFormComponent
  },
  {
    path: 'application-list',
    component: ApplicationListComponent
  },
  {
    path: 'application-view/:transcriptAddress',
    component: ApplicationViewComponent
  },
  {
    path: '',
    redirectTo: 'connect',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }