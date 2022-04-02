import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { GuitarFormComponent } from './components/guitar-form/guitar-form.component';
import { GuitarItemComponent } from './components/guitar-item/guitar-item.component';
import { GuitarListComponent } from './components/guitar-list/guitar-list.component';
import { GuitarRoutingModule } from './guitar-routing.module';

@NgModule({
  declarations: [GuitarListComponent, GuitarItemComponent, GuitarFormComponent],
  imports: [CommonModule, FormsModule, IonicModule, GuitarRoutingModule],
})
export class GuitarModule {}
