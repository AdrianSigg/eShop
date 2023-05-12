import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  token: string;
  user: string;
  user_email: string;
  logoutMessage: string;

  constructor(
    private auth: AuthService,
    private navCtrl: NavController,
    private toastController: ToastController // Inyectamos el ToastController
  ) {}

  ngOnInit() {
    this.token = localStorage.getItem('userToken') ?? 'none';
    console.log(this.token);
    this.getPerfil(this.token);
  }

  getPerfil(token: string) {
    this.auth.consultarUsuario(token).subscribe(
      (response: any) => {
        try {
          const perfil = JSON.parse(response); // convierte el string JSON en un objeto TypeScript
          this.user = perfil[0].nombre;
          this.user_email = perfil[0].correo;
        } catch (error) {}
      },
      (error) => {}
    );
  }

  cerrarSesion(token: string) {
    this.auth.cerrarSesion(token).subscribe(
      (response: any) => {
        this.logoutMessage = response.data;
        // Creamos el toast
        this.presentToast();
      },
      (error) => {}
    );
    localStorage.removeItem('userToken');
    this.navCtrl.navigateForward('/login');
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: this.logoutMessage,
      duration: 3000,
      position: 'bottom',
    });
    toast.present();
  }

  goBack() {
    this.navCtrl.back();
  }
}
