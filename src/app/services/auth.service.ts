import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  iniciarSesion(alias: string, contrasena: string) {
    const url = `http://localhost:8000/api/login/${alias}/${contrasena}`;
    return this.http.get(url);
  }

  registrarUsuario(alias: string, contrasena: string, correo: string) {
    const url = `http://localhost:8000/api/signin/${alias}/${contrasena}/${correo}`;
    return this.http.get(url);
  }

  userTokenHandler(response: Object){
    return JSON.parse(JSON.stringify(response)).token;
  }

  verificarSesion() {
    const url = `http://localhost:8000/api/verificar-sesion/`;
    return this.http.get(url);
  }

  cerrarSesion() {
    const url = `http://localhost:8000/api/logout/`;
    return this.http.get(url);
  }
}
