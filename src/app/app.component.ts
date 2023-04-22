import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Inicio', url: 'home', icon: 'home' },
    { title: 'Catálogo', url: 'catalogo', icon: 'shirt' },
    { title: 'Carrito', url: 'carrito', icon: 'cart' },
    { title: 'Perfil', url: 'perfil', icon: 'person' },
    { title: 'Configuración', url: 'configuracion', icon: 'settings' },
    { title: 'Ayuda', url: 'help', icon: 'help-circle' },
    { title: 'Acerca de', url: 'about', icon: 'information-circle' }
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor() {}
}
