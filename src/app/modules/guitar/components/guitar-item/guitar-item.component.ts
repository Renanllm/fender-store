import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { formatPrice } from '../../utils/functions/format-price';
import { Guitar } from '../../utils/models/guitar.interface';

@Component({
  selector: 'app-guitar-item',
  templateUrl: './guitar-item.component.html',
  styleUrls: ['./guitar-item.component.scss'],
})
export class GuitarItemComponent implements OnInit {
  @Input() guitar: Guitar;
  @Output() handleGuitarClickEvent = new EventEmitter<number>();

  constructor() {}

  ngOnInit() {}

  formatGuitarPrice(guitarPrice: number) {
    return formatPrice(guitarPrice);
  }

  handleGuitarClick() {
    this.handleGuitarClickEvent.emit(this.guitar.id);
  }
}
