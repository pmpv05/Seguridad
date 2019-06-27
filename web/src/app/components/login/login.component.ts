import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { UsuarioModel } from 'src/app/models/usuario.model';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  emailUsuario: string;
  passUsuario: string;

  usuarioObj: UsuarioModel = new UsuarioModel();


  constructor(private apiService: ApiService, private router: Router) {

  }

  login() {
    this.usuarioObj.email = this.emailUsuario;
    this.usuarioObj.password = this.passUsuario;

    this.apiService.login(this.usuarioObj);
  }
}
