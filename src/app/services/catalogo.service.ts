import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Catalogo } from '../interfaces/catalogo';

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

  getProducto(id: string) {
    const url = `http://localhost:8000/api/producto/${id}`;
    return this.http.get(url);
  }

  guardaFavorito(id_usuario: string, id_producto: string) {
    const url = `http://localhost:8000/api/favoritos/${id_usuario}/${id_producto}`;
    return this.http.get(url);
  }

  getFavoritos(id_usuario: string) {
    const url = `http://localhost:8000/api/getFavoritos/${id_usuario}`;
    return this.http.get(url);
  }

  guardaCarrito(id_usuario: string, id_producto: string) {
    const url = `http://localhost:8000/api/carrito/${id_usuario}/${id_producto}`;
    return this.http.get(url);
  }

  getCarrito(id_usuario: string) {
    const url = `http://localhost:8000/api/getCarrito/${id_usuario}`;
    return this.http.get(url);
  }

  comprar(id_producto: string, talla: string, cantidad: string) {
    const url = `http://localhost:8000/api/compra/${id_producto}/${talla}/${cantidad}`;
    return this.http.get(url);
  }
}
