import { Component, OnInit, SimpleChange, OnChanges, SimpleChanges } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  estaAutenticado: boolean;

  constructor(private apiService: ApiService, private router: Router) {
    this.estaAutenticado = this.apiService.estaAutenticado();
  }

  salir() {
    this.apiService.logout();
    this.estaAutenticado = false;

    this.router.navigateByUrl('/login');

  }

}
