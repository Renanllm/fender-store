import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { PersonalDatasComponent } from './components/personal-datas/personal-datas.component';
import { AuthGuard } from './modules/login/core/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'dados-cadastrais',
    component: PersonalDatasComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'guitarras',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./modules/guitar/guitar.module').then((m) => m.GuitarModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./modules/login/login.module').then((m) => m.LoginPageModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      onSameUrlNavigation: 'reload',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
