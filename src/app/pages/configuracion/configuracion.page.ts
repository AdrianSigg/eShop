import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.page.html',
  styleUrls: ['./configuracion.page.scss'],
})
export class ConfiguracionPage implements OnInit {
  darkMode: boolean = false;

  constructor(
    private navCtrl: NavController
  ) {
    this.checkDarkMode();
  }

  ngOnInit() {}

  checkDarkMode() {
    const element = document.body;
    const styles = window.getComputedStyle(element);
    const backgroundColor = styles.getPropertyValue('background-color');
    const backgroundColorHex = this.rgbToHex(backgroundColor);
    if (backgroundColorHex === ('#121212'||'#000000')) {
      this.darkMode = true;
    }else this.darkMode = false;
  }

  rgbToHex(rgb: string): string {
    const [r, g, b] = rgb.replace(/[^\d,]/g, '').split(',');
    return `#${(+r).toString(16)}${(+g).toString(16)}${(+b).toString(16)}`;
  }

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    document.body.classList.toggle('dark');
  }

  goBack() {
    this.navCtrl.back();
  }
}
