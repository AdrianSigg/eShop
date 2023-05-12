import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {
  segmentValue: string;

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    const queryParams = this.route.snapshot.queryParams;
    this.segmentValue = queryParams['tab'] || 'all';
  }

  goBack() {
    this.navCtrl.back();
  }
}
