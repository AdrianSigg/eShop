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

  consultarUsuario(token: string) {
    const url = `http://localhost:8000/api/profile/${token}`;
    return this.http.get(url);
  }

  userTokenHandler(response: Object){
    return JSON.parse(JSON.stringify(response)).token;
  }

  cerrarSesion(token: string) {
    const url = `http://localhost:8000/api/logout/${token}`;
    return this.http.get(url);
  }

  getToken(token: string){
    const url = `http://localhost:8000/api/check/${token}`;
    return this.http.get(url);
  }
}
