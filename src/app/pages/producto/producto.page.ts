import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { Catalogo } from 'src/app/interfaces/catalogo';
import { CatalogoService } from 'src/app/services/catalogo.service';
import { AuthService } from 'src/app/services/auth.service';
import { ModalController } from '@ionic/angular';
import { ComprasPage } from '../compras/compras.page';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Importa FormGroup y Validators

@Component({
  selector: 'app-producto',
  templateUrl: './producto.page.html',
  styleUrls: ['./producto.page.scss'],
})
export class ProductoPage implements OnInit {
  productos: Catalogo[] = [];
  compra: Catalogo[] = [];
  tallas: string[];
  colores: string[];
  user: string;
  myForm: FormGroup; // Agrega la variable myForm
  isComprarDisabled: boolean = true; // Variable para habilitar o deshabilitar el botón de comprar
  cantidad: number;
  talla: string;
  color: string;


  constructor(
    private navCtrl: NavController,
    public toastController: ToastController,
    private cat: CatalogoService,
    private auth: AuthService,
    private modalController: ModalController,
    private formBuilder: FormBuilder // Inyecta el formBuilder
  ) { }

  ngOnInit() {
    const arreglo = history.state.arreglo;
    this.productos = arreglo;
    this.colores = this.obtenerColoresUnicos(this.productos);
    this.tallas = this.obtenerTallasUnicas(this.productos);

    // Crea el formulario y agrega las validaciones requeridas
    this.myForm = this.formBuilder.group({
      cantidad: ['', Validators.required],
      talla: ['', Validators.required],
      color: ['', Validators.required]
    });

    // Suscribe al cambio en los controles del formulario para habilitar o deshabilitar el botón de comprar
    this.myForm.valueChanges.subscribe(() => {
      this.isComprarDisabled = this.myForm.invalid;
    });
  }

  ionViewDidEnter(){
      const token = localStorage.getItem('userToken')?? 'none';
      this.auth.consultarUsuario(token).subscribe(
        (response: any) => {
          const perfil = JSON.parse(response); // convierte el string JSON en un objeto TypeScript
          try{
            this.user = perfil[0].id;
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
      this.presentaToastFavoritos("Primero debes iniciar sesión");
      this.navCtrl.navigateForward('/login');
    }
  }

  agregarCarrito($id_usuario: string, $id_producto: string, $cantidad: string, $talla: string, $color:string) {
    if (localStorage.getItem("userToken")) {
      // Lógica para agregar el artículo a carrito
    this.cat.guardaCarrito($id_usuario, $id_producto).subscribe(
      (response: any) => {
        const toastMessage = JSON.parse(response.data);
        this.presentaToastCarrito(toastMessage.mensaje);
      },
      (error) => {

      }
    );
    }else {
      this.presentaToastFavoritos("Primero debes iniciar sesión");
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

  async presentaToastCarrito(toastMessage: string){
    const toast = await this.toastController.create({
      message: toastMessage,
      duration: 2000
    });
    toast.present();
  }

  async mostrarModal($id: string, $nombre: string,$precio: number,$imagen: string,$descripcion: string, $cantidad: string) {
    // Obtener los valores de los controles del formulario
    this.cantidad = this.myForm.get('cantidad')?.value;
    this.talla = this.myForm.get('talla')?.value;
    this.color = this.myForm.get('color')?.value;

    const nuevoProducto: Catalogo = {
      id: $id,
      nombre: $nombre,
      precio: $precio,
      imagen: $imagen,
      descripcion: $descripcion,
      cantidad: $cantidad,
      cantidadCompra: this.cantidad.toString(),
      talla: this.talla,
      color: this.color,
      selected: false
    };

    // Agregar el nuevo producto al arreglo "compra"
    this.compra = [nuevoProducto];

    console.log(this.compra);
    const modal = await this.modalController.create({
      component: ComprasPage,
      componentProps: {
        productos: this.compra // Pasar la propiedad 'productos' como parámetro al componente del modal
      },
      cssClass: 'my-modal-class'
    });

    return await modal.present();
  }
}
