import { Component, OnInit } from '@angular/core';
import { CatalogoService } from 'src/app/services/catalogo.service';
import { NavController } from '@ionic/angular';
import { Catalogo } from 'src/app/interfaces/catalogo';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.page.html',
  styleUrls: ['./catalogo.page.scss'],
})
export class CatalogoPage implements OnInit {
  productos: Catalogo[] = [];

  constructor(private cat: CatalogoService, private navCtrl: NavController) {}

  ngOnInit() {}

  getCatalogo(tipo: string) {
    this.cat.getCatalogo(tipo).subscribe(
      (response: any) => {
        const data = JSON.parse(response.data);
        this.productos = data; // Guardar los datos en un arreglo para usarlos en la plantilla
        this.navCtrl.navigateForward('/tienda', { state: { arreglo: this.productos } });
      },
      (error) => {

      }
    );
  }

  goBack() {
    this.navCtrl.back();
  }
}
