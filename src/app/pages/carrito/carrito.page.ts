import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Catalogo } from 'src/app/interfaces/catalogo';
import { CatalogoService } from 'src/app/services/catalogo.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {
  segmentValue: string;
  productos: Catalogo[] = [];
  userId: string;
  favArray: string[];
  responses: any[];
  showCards: boolean = false;

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private prod: CatalogoService,
    private auth: AuthService
  ) {}

  ngOnInit() {
    const queryParams = this.route.snapshot.queryParams;
    this.segmentValue = queryParams['tab'] || 'all';
    const arreglo = history.state.arreglo;
    this.productos = arreglo;
  }

  getProducto(id: string) {
    this.prod.getProducto(id).subscribe(
      (response: any) => {
        const data = JSON.parse(response.data);
      },
      (error) => {}
    );
  }

  getFavoritos($id_usuario: string) {
    this.prod.getFavoritos($id_usuario).subscribe(
      (response: any) => {
        const jsonObject = JSON.parse(response.data);
        const dataString = jsonObject[0];
        this.favArray = dataString.split(',').map(Number);
        this.responses = []; // se reinicia la variable responses
        for (let index = 0; index < this.favArray.length; index++) {
          this.prod
            .getProducto(this.favArray[index])
            .subscribe((response: any) => {
              const jsonData = JSON.parse(response.data);
              this.responses.push(jsonData[0]);
            });
        }
        setTimeout(() => {
          this.showCards = true; // se establece en true para cargar los ion-cards
        }, 3000);
      },
      (error) => {}
    );
  }

  goBack() {
    this.navCtrl.back();
  }

  ionViewDidEnter() {
    const token = localStorage.getItem('userToken') ?? 'none';
    this.auth.consultarUsuario(token).subscribe(
      (response: any) => {
        const perfil = JSON.parse(response); // convierte el string JSON en un objeto TypeScript
        try {
          this.userId = perfil[0].id;
          this.getFavoritos(this.userId);
        } catch {}
      },
      (error) => {}
    );
  }
}
