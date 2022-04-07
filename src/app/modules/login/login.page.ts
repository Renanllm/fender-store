import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { User } from './user.interface';
import { UserService } from './user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  form: FormGroup;
  user: User;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private alertController: AlertController,
    private userService: UserService
  ) {
    userService.logout();
  }

  ngOnInit() {
    this.buildForm();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Algo de errado não está certo!',
      message: 'Usuário ou senha inválidos.',
      buttons: ['Fechar'],
    });
    await alert.present();
  }

  buildForm() {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    if (this.form.valid) {
      const payload = this.form.value;

      this.userService.find(payload).subscribe((users) => {
        if (users.length === 0) {
          this.form.reset();
          this.presentAlert();
          return;
        }

        const user = users[0];

        this.userService.login(user);
        this.router.navigate([`guitarras/`]);
      });
    }
  }
}
