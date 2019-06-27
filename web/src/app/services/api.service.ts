import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  TOKEN_KEY = 'token';

  private url = 'http://localhost:8000';

  userToken: string;

  constructor(private http: HttpClient, private router: Router) {
    this.leerToken();
  }

  logout() {
    localStorage.removeItem('token');
  }

  login(usuario: UsuarioModel) {

    const authData = {
      email: usuario.email,
      password: usuario.password
    };

    return this.http.post(
      `${this.url}/sessions`,
      authData
    ).subscribe
      (resp => {
        this.guardarToken(resp['token']);
        console.log(resp);
        Swal.fire({
          type: 'success',
          title: 'Autenticación exitosa!',
          showConfirmButton: false,
          timer: 1000
        })

        this.router.navigateByUrl('/cifrado');
      },
        err => {
          Swal.fire({
            type: 'error',
            title: 'Correo y/o contraseña incorrecta'
          });
          console.log(err);
        });
  }

  private guardarToken(xToken: string) {

    this.userToken = xToken;
    localStorage.setItem('token', xToken);
  }

  leerToken() {

    if (localStorage.getItem('token')) {
      this.userToken = localStorage.getItem('token');
    } else {
      this.userToken = '';
    }

    return this.userToken;
  }


  estaAutenticado(): boolean {

    if (this.userToken.length < 2) {
      return false;
    } else {
      return true;
    }
  }
}
