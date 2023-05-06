import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { Catalogo } from 'src/app/interfaces/catalogo';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.page.html',
  styleUrls: ['./producto.page.scss'],
})
export class ProductoPage implements OnInit {
  productos: Catalogo[] = [];
  tallas: string[];
  colores: string[];

  constructor(
    private navCtrl: NavController,
    public toastController: ToastController
  ) { }

  ngOnInit() {
    const arreglo = history.state.arreglo;
    this.productos = arreglo;
    this.colores = this.obtenerColoresUnicos(this.productos);
    this.tallas = this.obtenerTallasUnicas(this.productos);
  }

  obtenerTallasUnicas(productos: any[]): string[] {
    const tallas = productos.map(producto => producto.talla);
    return tallas.filter((talla, index) => tallas.indexOf(talla) === index);
  }

  obtenerColoresUnicos(productos: any[]): string[] {
    const colores = productos.map(producto => producto.color);
    return colores.filter((color, index) => colores.indexOf(color) === index);
  }

  goBack() {
    this.navCtrl.back();
  }

  async agregarFavorito() {
    // Lógica para agregar el artículo a favoritos
    // ...

    const toast = await this.toastController.create({
      message: 'El artículo se ha agregado a tus favoritos.',
      duration: 2000
    });
    toast.present();
  }
}
