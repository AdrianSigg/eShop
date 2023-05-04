import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CatalogoService {
  constructor(private http: HttpClient) {}

  getCatalog(tipo: string) {
    const url = `http://localhost:8000/api/catalogo/${tipo}`;
    return this.http.get(url);
  }
}
