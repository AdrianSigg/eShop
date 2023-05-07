import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private navCtrl: NavController
  ) {
    this.buildForm();
  }

  ngOnInit() {
  }

  private buildForm(){
    this.form = this.formBuilder.group({
      usuario: ['', [Validators.required]],
      contrasena: ['', [Validators.required]],
      contrasena2: ['', [Validators.required]],
      correo: ['',[Validators.required, Validators.email]],
    })
  }

  get usuarioField(){
    return this.form.get('usuario');
  }

  get contrasenaField(){
    return this.form.get('contrasena');
  }

  get contrasena2Field(){
    return this.form.get('contrasena2');
  }

  get correoField(){
    return this.form.get('correo');
  }

  enviaRegistro(){
    const usuario = this.usuarioField?.value;
    const contrasena = this.contrasenaField?.value;
    const correo = this.correoField?.value;

    this.auth.registrarUsuario(usuario, contrasena, correo).subscribe(
      () => {
        this.navCtrl.navigateForward('/login');
      },
      (error) => {
        
      }
    );
    this.resetForm();
  }

  resetForm(){
    this.form.reset();
  }

  goBack() {
    this.navCtrl.back();
  }
}
