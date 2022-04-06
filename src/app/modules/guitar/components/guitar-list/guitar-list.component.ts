import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GuitarService } from '../../services/guitar.service';
import { Guitar } from '../../utils/models/guitar.interface';

@Component({
  selector: 'app-guitar-list',
  templateUrl: './guitar-list.component.html',
  styleUrls: ['./guitar-list.component.scss'],
})
export class GuitarListComponent implements OnInit {
  guitars: Guitar[];

  constructor(
    private guitarService: GuitarService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.guitarService = guitarService;
  }

  ngOnInit() {
    this.route.data.subscribe(({ reload }) => {
      if (reload) {
        this.findGuitars();
      }
    });
  }

  findGuitars() {
    this.guitarService.findAll().subscribe((guitars) => {
      this.guitars = guitars;
    });
  }

  handleGuitarClick(guitarId: number) {
    this.router.navigate([`guitarras/form/${guitarId}`]);
  }

  redirectToCreatePage() {
    this.router.navigate([`guitarras/form`]);
  }
}
