import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuitarFormComponent } from './components/guitar-form/guitar-form.component';
import { GuitarListComponent } from './components/guitar-list/guitar-list.component';

const routes: Routes = [
  {
    path: '',
    component: GuitarListComponent,
  },
  {
    path: ':id',
    component: GuitarFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GuitarRoutingModule {}
