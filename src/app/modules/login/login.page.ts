import { UserService } from './user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private alertController: AlertController,
    private authService: AuthService,
    private loadingController: LoadingController,
    private userService: UserService
  ) {
  }

  get email() {
    return this.form.get('emial');
  };

  get password() {
    return this.form.get('password');
  };

  ngOnInit() {
    this.userService.logout();
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  };

  async register() {
    const loading = await this.loadingController.create();
    await loading.present();

    const user = await this.authService.register(this.form.value);
    await loading.dismiss();

    if (user) {
      document.location.reload();
    } else {
      this.showAlert('Registration failed', 'Please thy again!');
    }
  };

  async login() {
    const loading = await this.loadingController.create();
    await loading.present();

    const response = await this.authService.login(this.form.value);
    this.userService.login(response);

    await loading.dismiss();

    if (response) {
      this.router.navigate(['guitarras/']);
    } else {
      this.showAlert('Login failed', 'Please thy again!');
    }
  };

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  };

}
