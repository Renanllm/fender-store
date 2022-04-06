import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    {
      title: 'Meus dados cadastrais',
      url: '/dados-cadastrais',
      icon: 'person',
    },
    { title: 'Guitarras', url: '/guitarras', icon: 'pricetag' },
  ];

  constructor() {}
}
