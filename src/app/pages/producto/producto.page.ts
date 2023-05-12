import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { Catalogo } from 'src/app/interfaces/catalogo';
import { CatalogoService } from 'src/app/services/catalogo.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.page.html',
  styleUrls: ['./producto.page.scss'],
})
export class ProductoPage implements OnInit {
  productos: Catalogo[] = [];
  tallas: string[];
  colores: string[];
  user: string;


  constructor(
    private navCtrl: NavController,
    public toastController: ToastController,
    private cat: CatalogoService,
    private auth: AuthService
  ) { }

  ngOnInit() {
    const arreglo = history.state.arreglo;
    this.productos = arreglo;
    this.colores = this.obtenerColoresUnicos(this.productos);
    this.tallas = this.obtenerTallasUnicas(this.productos);
  }

  ionViewDidEnter(){
      const token = localStorage.getItem('userToken')?? 'none';
      this.auth.consultarUsuario(token).subscribe(
        (response: any) => {
          const perfil = JSON.parse(response); // convierte el string JSON en un objeto TypeScript
          try{
            this.user = perfil[0].nombre;
          }catch{

          }
        },
        (error) => {

        }
      );
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

  agregarFavorito($id_usuario: string, $id_producto: string) {
    if (localStorage.getItem("userToken")) {
      // Lógica para agregar el artículo a favoritos
    this.cat.guardaFavorito($id_usuario, $id_producto).subscribe(
      (response: any) => {
        const toastMessage = JSON.parse(response.data);
        this.presentaToastFavoritos(toastMessage.mensaje);
      },
      (error) => {
        
      }
    );
    }else {
      this.navCtrl.navigateForward('/login');
    }
  }

  async presentaToastFavoritos(toastMessage: string){
    const toast = await this.toastController.create({
      message: toastMessage,
      duration: 2000
    });
    toast.present();
  }
}
