import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { APP_ROUTING } from './app-routing.module';
import { AppComponent } from './app.component';
import { CifradoComponent } from './components/files/cifrado.component';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FirmaComponent } from './components/firma/firma.component';
import { VerificarfirmaComponent } from './components/verificarfirma/verificarfirma.component';

@NgModule({
  declarations: [
    AppComponent,
    CifradoComponent,
    LoginComponent,
    NavbarComponent,
    FirmaComponent,
    VerificarfirmaComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTING,
    HttpClientModule, FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
