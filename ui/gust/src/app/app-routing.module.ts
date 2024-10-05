import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LearnComponent } from './learn/learn.component';
import { DeveloperComponent } from './developer/developer.component';
import { NetworkComponent } from './network/network.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path:"about",
    component: LearnComponent
  },
  {
    path: "developer",
    component: DeveloperComponent
  },
  {
    path:"network",
    component: NetworkComponent
  },
  {
    path: "register",
    component: RegisterComponent
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes, {bindToComponentInputs: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
