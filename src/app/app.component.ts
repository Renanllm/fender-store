import { UserService } from './modules/login/user.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  public appPages = [
    {
      title: 'Meus dados cadastrais',
      url: '/dados-cadastrais',
      icon: 'person',
    },
    { title: 'Guitarras', url: '/guitarras', icon: 'pricetag' },
    { title: 'Logout', url: '/login', icon: 'log-out' },
  ];

  isUserLogged = false;
  userSubscription: Subscription;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userSubscription = this.userService.isUserLoggedSubscription.subscribe(
      (res) => (this.isUserLogged = res)
    );
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
