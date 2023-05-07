import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  token: string
  user: string;
  user_email: string;

  constructor(
    private auth: AuthService,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.token = localStorage.getItem('userToken') ?? 'none';
    this.getPerfil(this.token);
  }

  getPerfil(token: string) {
    this.auth.consultarUsuario(token).subscribe(
      (response: any) => {
        try {
          const perfil = JSON.parse(response); // convierte el string JSON en un objeto TypeScript
          this.user = perfil[0].nombre;
          this.user_email = perfil[0].correo;
        } catch (error) {
          
        }
      },
      (error) => {
      }
    );
  }

  cerrarSesion(token: string){
    this.auth.cerrarSesion(token);
    localStorage.removeItem("userToken");
    this.navCtrl.navigateForward('/login');
  }

  goBack() {
    this.navCtrl.back();
  }
}
