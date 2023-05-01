import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  token: string;

  constructor(
  ) { }

  ngOnInit() {}

  ionViewWillEnter() {
    this.checkLoginStatus();
  }


  checkLoginStatus() {
    const userToken = localStorage.getItem('userToken');
    this.token = userToken ? userToken : 'null';
  }
}
