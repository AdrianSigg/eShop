import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor(
    private http: HttpClient
  ) { }

  getUsuarios() {
    return this.http.get('http://localhost:8000/api/usuarios');
  }

  consultarUsuario(alias: string, contrasena: string) {
    const url = `http://localhost:8000/api/usuarios/${alias}/${contrasena}`;
    return this.http.get(url);
}


}
