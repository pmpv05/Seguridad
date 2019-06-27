import { RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { CifradoComponent } from './components/files/cifrado.component';
import { AuthGuard } from './guards/guard.guard';
import { FirmaComponent } from './components/firma/firma.component';
import { VerificarfirmaComponent } from './components/verificarfirma/verificarfirma.component';

const routes = [
  {
    path: "login", component: LoginComponent
  },
  {
    path: "cifrado", component: CifradoComponent, canActivate: [AuthGuard]
  },
  {
    path: "firma", component: FirmaComponent, canActivate: [AuthGuard]
  },
  {
    path: "verificarFirma", component: VerificarfirmaComponent, canActivate: [AuthGuard]
  },
  {
    path: "**", pathMatch: "full", redirectTo: "login"
  }
];

export const APP_ROUTING = RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' });
