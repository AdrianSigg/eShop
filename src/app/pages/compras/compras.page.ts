import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonModal, AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { Catalogo } from 'src/app/interfaces/catalogo';
import { CatalogoService } from 'src/app/services/catalogo.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-compras',
  templateUrl: './compras.page.html',
  styleUrls: ['./compras.page.scss'],
})
export class ComprasPage implements OnInit {
  @ViewChild(IonModal) modal: IonModal;
  @Input() productos: Catalogo[]; // Recibir el arreglo de productos como propiedad de entrada

  nombre: string;
  direccion: string;
  tarjeta: string;
  fechaVencimiento: string;
  codigoSeguridad: string;
  id_producto: string[] = [];
  talla: string[] = [];
  formulario: FormGroup;
  compraForm = true;
  alertButtons = [
    {
      text: 'Aceptar',
      handler: () => {
        // Aquí puedes realizar alguna acción al hacer clic en el botón "Aceptar" del alerta
      }
    }
  ];

  constructor(
    private modalController: ModalController,
    private catalogoService: CatalogoService,
    private formBuilder: FormBuilder,
    private alertController: AlertController
  ) {
    this.formulario = this.formBuilder.group({
      nombre: ['', Validators.required],
      direccion: ['', Validators.required],
      tarjeta: ['', Validators.required],
      fechaVencimiento: ['', Validators.required],
      codigoSeguridad: ['', Validators.required]
    });
  }

  ngOnInit() {}

  dismissModal() {
    this.modalController.dismiss();
  }

  async presentAlertForm() {
    const alert = await this.alertController.create({
      header: 'Campos faltantes',
      message: 'Por favor rellene todos los campos',
      buttons: this.alertButtons
    });

    await alert.present();
  }

  async presentAlertCompra() {
    const alert = await this.alertController.create({
      header: 'Compra realizada con éxito',
      buttons: this.alertButtons
    });

    await alert.present();
  }

  realizarCompra() {
    if (this.formulario.invalid) {
      this.compraForm = false;
      this.presentAlertForm();
      return;
    }

    console.log(this.productos);

    this.compraForm = true;

    const id_producto: string[] = [];
    const talla: string[] = [];
    const cantidadCompra: string[] = [];

    this.productos.forEach((producto) => {
      id_producto.push(producto.id);
      talla.push(producto.talla);
      cantidadCompra.push(producto.cantidadCompra || '1'); // Establecer 1 como valor por defecto si no hay cantidad
    });

    for (let index = 0; index < id_producto.length; index++) {
      this.catalogoService.comprar(id_producto[index], talla[index], cantidadCompra[index]).subscribe(
        (response: any) => {
          // Manejar la respuesta del servicio
        },
        (error) => {
          // Manejar el error del servicio
        }
      );
    }

    this.presentAlertCompra();
    this.dismissModal();
  }

}
