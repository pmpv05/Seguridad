import { RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { FilesComponent } from './components/files/files.component';
import { AuthGuard } from './guards/guard.guard';

const routes = [
  {
    path: "login", component: LoginComponent
  },
  {
    path: "file", component: FilesComponent, canActivate: [AuthGuard]
  },
  {
    path: "**", pathMatch: "full", redirectTo: "login"
  }
];

export const APP_ROUTING = RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' });
