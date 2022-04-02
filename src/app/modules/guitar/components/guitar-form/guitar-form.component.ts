import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GuitarService } from '../../services/guitar.service';

@Component({
  selector: 'app-guitar-form',
  templateUrl: './guitar-form.component.html',
  styleUrls: ['./guitar-form.component.scss'],
})
export class GuitarFormComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private guitarService: GuitarService,
    private router: Router
  ) {
    this.guitarService = guitarService;
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
      features: ['', Validators.required],
      indicatedLevel: ['', Validators.required],
    });
  }

  handleSubmit() {
    if (this.form.valid) {
      const payload = this.form.value;
      this.guitarService.create(payload).subscribe(() => {
        this.router.navigate([`guitarras/`]);
      });
    }
  }
}
