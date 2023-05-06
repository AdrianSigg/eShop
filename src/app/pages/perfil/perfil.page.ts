import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  user: string;
  user_email: string;

  constructor(
    private auth: AuthService,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    const storedUsername = localStorage.getItem('userToken') ?? 'none';
    this.user = localStorage.getItem('username') ?? 'no logged';
    this.user_email = localStorage.getItem('email') ?? 'no logged';
    this.auth.verificarSesion().subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  cerrarSesion(){
    this.auth.cerrarSesion();
    localStorage.removeItem("userToken");
    localStorage.removeItem("username");
    this.navCtrl.navigateForward('/login');
  }

  goBack() {
    this.navCtrl.back();
  }
}
