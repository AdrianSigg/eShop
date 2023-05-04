import { Component, OnInit } from '@angular/core';
import { CatalogoService } from 'src/app/services/catalogo.service';
import { NavController } from '@ionic/angular';
import { Catalogo } from 'src/app/interfaces/catalogo';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  token: string;
  productos: Catalogo[] = [];

  constructor(
    private cat: CatalogoService, private navCtrl: NavController
  ) { }

  ngOnInit() {}

  ionViewWillEnter() {
    this.checkLoginStatus();
  }

  checkLoginStatus() {
    const userToken = localStorage.getItem('userToken');
    this.token = userToken ? userToken : 'null';
  }

  getColeccion(sexo: string) {
    this.cat.getColeccion(sexo).subscribe(
      (response: any) => {
        const data = JSON.parse(response.data);
        this.productos = data; // Guardar los datos en un arreglo para usarlos en la plantilla
        console.log(this.productos);
        this.navCtrl.navigateForward('/tienda', { state: { arreglo: this.productos } });
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
