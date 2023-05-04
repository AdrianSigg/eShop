import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  form: FormGroup;
  err: Object;
  errorField: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private navCtrl: NavController,
  ) {
    this.buildForm();
  }

  ngOnInit() {
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      usuario: ['', [Validators.required]],
      contrasena: ['', [Validators.required]],
    });
  }

  get usuarioField() {
    return this.form.get('usuario');
  }

  get contrasenaField() {
    return this.form.get('contrasena');
  }

  iniciaSesion() {
    const usuario = this.usuarioField?.value;
    const contrasena = this.contrasenaField?.value;

    this.auth.iniciarSesion(usuario, contrasena).subscribe(
      (response) => {
        if (!this.auth.userTokenHandler(response)) {
          this.errorField = true;
          this.err = JSON.parse(JSON.stringify(response)).error;;
        }else {
          // Se guarda el token en el local storage
          localStorage.setItem('userToken', this.auth.userTokenHandler(response));
          localStorage.setItem('username', JSON.parse(JSON.stringify(response)).user);
          this.navCtrl.navigateForward('/home');
        }
      },
      (error) => {
        console.error(error);
      }
    );
    this.resetForm();
  }

  resetForm() {
    this.form.reset();
  }

  goBack() {
    this.navCtrl.back();
  }
}
