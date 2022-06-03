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

  constructor(
    private guitarService: GuitarService,
    private router: Router,
  ) {
    this.guitarService = guitarService;
  }

  ngOnInit() {
    this.guitarService.findAllListen().subscribe(res=>{
      if(res){
        this.guitars = res.map(e => ({
            id: e.payload.doc.id,
            name: e.payload.doc.data().name,
            type: e.payload.doc.data().type,
            price: e.payload.doc.data().price,
            description: e.payload.doc.data().description,
            features: e.payload.doc.data().features,
            indicatedLevel: e.payload.doc.data().indicatedLevel
          }));
      }
    });
  }

  handleGuitarClick(guitarId: string) {
    const guitar = this.guitars.find(g => g.id === guitarId);
    this.router.navigate([`guitarras/form/${guitarId}`], { state: { data: guitar }  });
  }

  redirectToCreatePage() {
    this.router.navigate([`guitarras/form`]);
  }
}
