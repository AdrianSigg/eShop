import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Catalogo } from 'src/app/interfaces/catalogo';


@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.page.html',
  styleUrls: ['./tienda.page.scss'],
})
export class TiendaPage implements OnInit {
  productos: Catalogo[] = [];

  constructor(
    private auth: AuthService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    const arreglo = history.state.arreglo;
    this.productos = arreglo;
  }


}
