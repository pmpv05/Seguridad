import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private apiService: ApiService) { }

  canActivate(): boolean {

    if (this.apiService.estaAutenticado()) {
      return true;
    } else {
      return false;
    }
  }
}