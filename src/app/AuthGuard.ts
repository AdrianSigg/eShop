import { Injectable } from '@angular/core';
import {Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(
    private router: Router,
    private auth: AuthService) {}

  canActivate() {
    return this.auth.verificarSesion();
  }
}
