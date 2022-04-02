import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GuitarService } from '../../services/guitar.service';
import { Guitar } from '../../utils/models/guitar.interface';

@Component({
  selector: 'app-guitar-list',
  templateUrl: './guitar-list.component.html',
  styleUrls: ['./guitar-list.component.scss'],
})
export class GuitarListComponent implements OnInit {
  guitars: Guitar[];

  constructor(private guitarService: GuitarService, private router: Router) {
    this.guitarService = guitarService;
  }

  ngOnInit() {
    this.guitarService.findAll().subscribe((guitars) => {
      this.guitars = guitars;
    });
  }

  handleGuitarClick(guitarId: number) {
    this.router.navigate([`guitarras/${guitarId}`]);
  }
}
