import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor(private http: HttpClient, private formBuilder: FormBuilder, private router: Router,) { }

  ngOnInit() {
    this.buildForm();
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

  findPassword(password: string) {
    return this.http.get(`${environment.baseUrl}/users?password=${password}`);
  }

  login() {
    if (this.form.valid) {
      const payload = this.form.value;

    this.findUser(payload.username).subscribe(user => {
      if(!payload.username == user[0].username) {
        console.log("Telinha de erro aqui");
      }
      this.findPassword(payload.password).subscribe(pass => {
        if(!payload.password == user[0].password) {
          console.log("Outra tela de erro aqui");
        }
        this.router.navigate([`guitarras/`]);
      })
    });
  }
  }



}
