import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CatalogoService {
  constructor(private http: HttpClient) {}

  getCatalogo(tipo: string) {
    const url = `http://localhost:8000/api/catalogo/${tipo}`;
    return this.http.get(url);
  }

  getColeccion(sexo: string) {
    const url = `http://localhost:8000/api/coleccion/${sexo}`;
    return this.http.get(url);
  }
}
