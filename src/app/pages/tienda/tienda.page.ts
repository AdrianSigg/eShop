import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.page.html',
  styleUrls: ['./tienda.page.scss'],
})
export class TiendaPage implements OnInit {
  usuarios: any;

  constructor(
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.auth.iniciarSesion('admin', '1111').subscribe(
      (usuario) => {
        console.log(usuario);
      },
      (error) => {
        console.error(error);
      }
    );

  }
}
