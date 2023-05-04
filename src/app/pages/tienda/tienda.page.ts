import { Component, OnInit } from '@angular/core';
import { Catalogo } from 'src/app/interfaces/catalogo';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.page.html',
  styleUrls: ['./tienda.page.scss'],
})
export class TiendaPage implements OnInit {
  productos: Catalogo[] = [];

  constructor(
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    const arreglo = history.state.arreglo;
    this.productos = arreglo;
  }

  goBack() {
    this.navCtrl.back();
  }
}
