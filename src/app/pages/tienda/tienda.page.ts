import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../../services/api-service.service';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.page.html',
  styleUrls: ['./tienda.page.scss'],
})
export class TiendaPage implements OnInit {
  usuarios: any;

  constructor(
    private apiService: ApiServiceService
  ) {}

  ngOnInit() {
    this.apiService.consultarUsuario('admin', '1111').subscribe(
      (usuario) => {
        console.log(usuario);
      },
      (error) => {
        console.error(error);
      }
    );

  }
}
