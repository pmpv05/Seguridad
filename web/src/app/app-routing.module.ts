import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { FilesComponent } from './components/files/files.component';

const routes = [
  {
    path: "login", component: LoginComponent
  },
  {
    path: "file", component: FilesComponent
  },
  {
    path: "**", pathMatch: "full", redirectTo: "file"
  }
];

export const APP_ROUTING = RouterModule.forRoot(routes);
