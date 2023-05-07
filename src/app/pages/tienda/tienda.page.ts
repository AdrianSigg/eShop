import { Component, OnInit } from '@angular/core';
import { Catalogo } from 'src/app/interfaces/catalogo';
import { NavController } from '@ionic/angular';
import { CatalogoService } from 'src/app/services/catalogo.service';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.page.html',
  styleUrls: ['./tienda.page.scss'],
})
export class TiendaPage implements OnInit {
  productos: Catalogo[] = [];

  constructor(
    private navCtrl: NavController,
    private prod: CatalogoService
  ) {}

  ngOnInit() {
    const arreglo = history.state.arreglo;
    this.productos = arreglo;
    
  }

  getProducto(id: string) {
    this.prod.getProducto(id).subscribe(
      (response: any) => {
        const data = JSON.parse(response.data);
        this.navCtrl.navigateForward('/producto', { state: { arreglo: data } });
      },
      (error) => {

      }
    );
  }


  goBack() {
    this.navCtrl.back();
  }

  // ionViewWillEnter() {
  //   if (this.productos.length == 9) {
  //     location.reload();
  //   }
  // }
}
