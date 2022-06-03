import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GuitarService } from '../../services/guitar.service';
import { Guitar } from '../../utils/models/guitar.interface';

@Component({
  selector: 'app-guitar-form',
  templateUrl: './guitar-form.component.html',
  styleUrls: ['./guitar-form.component.scss'],
})
export class GuitarFormComponent implements OnInit {
  form: FormGroup;
  guitar: Guitar;
  isConfirmDeleteModalOpen = false;

  constructor(
    private formBuilder: FormBuilder,
    private guitarService: GuitarService,
    private router: Router,
    private location: Location
  ) {
    this.guitarService = guitarService;
  }

  ngOnInit() {
    this.buildForm();

    const state: any = this.location.getState();

    if (state?.data) {
      this.guitar = state?.data;
      this.fillForm();
    }
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

  fillForm() {
    const formValue = { ...this.guitar };
    delete formValue.id;

    this.form.setValue(formValue);
  }

  handleSubmit() {
    if (this.form.valid) {
      const payload = this.form.value;

      if (this.guitar?.id) {
        this.guitarService.update(payload, this.guitar.id).then(() => {
          this.router.navigate([`guitarras/`]);
        });
      } else {
        this.guitarService.create(payload).then(() => {
          this.router.navigate([`guitarras/`]);
        });
      }
    }
  }

  openConfirmDeleteModal() {
    this.isConfirmDeleteModalOpen = true;
  }

  dismissModal() {
    this.isConfirmDeleteModalOpen = false;
  }

  handleDeleteClick() {
    this.dismissModal();
    this.guitarService.delete(this.guitar?.id).then(() => {
      this.router.navigate([`guitarras/`]);
    });
  }
}
