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

  constructor(
    private auth: AuthService,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.user = localStorage.getItem('username') ?? 'usuario';
  }

  cerrarSesion(){
    this.auth.cerrarSesion();
    localStorage.removeItem("userToken");
    localStorage.removeItem("username");
    this.navCtrl.navigateForward('/login');
  }

}
