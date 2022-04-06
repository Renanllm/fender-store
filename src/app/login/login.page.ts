import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { User } from './user.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  form: FormGroup;
  user: User

  constructor(private http: HttpClient, private formBuilder: FormBuilder, private router: Router, private alertController: AlertController) { }

  ngOnInit() {
    this.buildForm();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Algo de errado não está certo',
      message: 'Usuário ou senha inválidos.',
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  buildForm() {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  findUser(username: string) {
    return this.http.get(`${environment.baseUrl}/users?username=${username}`);
  }

  login() {
    if (this.form.valid) {
      const payload = this.form.value;

    this.findUser(payload.username).subscribe(user => {
      if(user[0]?.username === undefined || payload.username != user[0]?.username) {
        this.presentAlert()
      } else if (user[0]?.password === undefined || payload.password != user[0]?.password) {
        this.presentAlert()
      } else {
        this.router.navigate([`guitarras/`]);
      }
    });
  }
  }

}
