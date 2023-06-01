import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Catalogo } from 'src/app/interfaces/catalogo';
import { CatalogoService } from 'src/app/services/catalogo.service';
import { AuthService } from 'src/app/services/auth.service';
import { ModalController } from '@ionic/angular';
import { ComprasPage } from '../compras/compras.page';

@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.page.html',
  styleUrls: ['./articulos.page.scss'],
})
export class ArticulosPage implements OnInit {
  segmentValue: string;
  responsesFav: Catalogo[] = [];
  responsesCarr: Catalogo[] = [];
  showCards: boolean = false;
  countMessage: number;
  productos: Catalogo[] = [];

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private catalogoService: CatalogoService,
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    const queryParams = this.route.snapshot.queryParams;
    this.segmentValue = queryParams['tab'] || 'all';
    const arreglo = history.state.arreglo;
    this.responsesFav = arreglo;
    this.responsesCarr = arreglo;
  }

  async ionViewDidEnter() {
    const token = localStorage.getItem('userToken') ?? 'none';
    const loading = await this.loadingCtrl.create({
      message: 'Cargando...',
      spinner: 'bubbles'
    });
    await loading.present();

    this.authService.consultarUsuario(token).subscribe(
      (response: any) => {
        const perfil = JSON.parse(response);
        try {
          const userId = perfil[0].id;
          this.getFavoritos(userId, loading);
          this.getCarrito(userId, loading);
        } catch {}
      },
      (error) => {
        loading.dismiss();
      }
    );
  }

  getFavoritos(id_usuario: string, loading: HTMLIonLoadingElement) {
    this.catalogoService.getFavoritos(id_usuario).subscribe(
      (response: any) => {
        const jsonObject = JSON.parse(response.data);
        const dataString = jsonObject[0];
        const favArray = dataString.split(',').map(Number);
        this.responsesFav = [];
        let count = 0;
        for (let i = 0; i < favArray.length; i++) {
          this.catalogoService.getProducto(favArray[i]).subscribe((response: any) => {
            const jsonData = JSON.parse(response.data);
            this.responsesFav.push(jsonData[0]);
            count++;
            if (count === favArray.length) {
              loading.dismiss();
              this.showCards = true;
            }
          });
        }
      },
      (error) => {
        loading.dismiss();
      }
    );
  }

  getCarrito(id_usuario: string, loading: HTMLIonLoadingElement) {
    this.catalogoService.getCarrito(id_usuario).subscribe(
      (response: any) => {
        const jsonObject = JSON.parse(response.data);
        const dataString = jsonObject[0];
        const carrArray = dataString.split(',').map(Number);
        this.responsesCarr = [];
        let count = 0;
        for (let i = 0; i < carrArray.length; i++) {
          this.catalogoService.getProducto(carrArray[i]).subscribe((response: any) => {
            const jsonData = JSON.parse(response.data);
            this.responsesCarr.push(jsonData[0]);
            count++;
            if (count === carrArray.length) {
              loading.dismiss();
              this.showCards = true;
            }
          });
        }
      },
      (error) => {
        loading.dismiss();
      }
    );
  }

  selectCard(producto: Catalogo) {
    if (this.segmentValue === 'favorites') {
      this.navigateToProduct(producto); // Acción para las tarjetas de favoritos
    } else {
      producto.selected = !producto.selected; // Cambia el estado de selección del producto

      const selectedProducts = this.responsesCarr.filter((p) => p.selected);
      const selectedCount = selectedProducts.length;

      // Muestra el mensaje de "X seleccionados" dependiendo de la cantidad de productos seleccionados
      this.countMessage = Number(`${selectedCount}`);

      if (this.countMessage === 0) {
        this.countMessage = -1;
      }

      // Agrega o quita el ID del producto del arreglo de productos seleccionados
      if (producto.selected) {
        const alreadySelected = selectedProducts.some((p) => p.id === producto.id);
        if (!alreadySelected) {
          selectedProducts.push(producto);
        }
      } else {
        const index = selectedProducts.findIndex((p) => p.id === producto.id);
        if (index !== -1) {
          selectedProducts.splice(index, 1);
        }
      }

      this.seleccionaCarrito(selectedProducts); // Acción para las tarjetas del carrito
      console.log(selectedProducts);
    }
  }



  navigateToProduct(producto: Catalogo) {
    this.catalogoService.getProducto(producto.id).subscribe(
      (response: any) => {
        const data = JSON.parse(response.data);
        this.navCtrl.navigateForward('/producto', { state: { arreglo: data } });
      },
      (error) => {}
    );
  }

  seleccionaCarrito(productos: Catalogo[]) {
    this.productos = productos; // Almacenar el arreglo en la propiedad 'productos'
  }

  goBack() {
    this.navCtrl.back();
  }

  async mostrarModal() {

    console.log(this.productos);
    // Si no se seleccionaron los articulos del carrito, se compran todos
    if (this.productos.length === 0) {
      for (let index = 0; index < this.responsesCarr.length; index++) {
        this.productos[index] = this.responsesCarr[index];
      }
    }

    const modal = await this.modalController.create({
      component: ComprasPage,
      componentProps: {
        productos: this.productos // Pasar la propiedad 'productos' como parámetro al componente del modal
      },
      cssClass: 'my-modal-class'
    });

    return await modal.present();
  }
}
