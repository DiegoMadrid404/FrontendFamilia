import { Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HijosService } from '../services/hijos/hijos.service';
import { CoreService } from '../core/core.service';
@Component({
  selector: 'app-hijos',
  templateUrl: './hijos.component.html',
  styleUrls: ['./hijos.component.scss']
})
export class HijosComponent implements OnInit {
  form: FormGroup;


  constructor(private _fb: FormBuilder,
    private _hijosService: HijosService,
    private _dialogRef: MatDialogRef<HijosComponent>,
    private _coreservice: CoreService,
    @Inject(MAT_DIALOG_DATA) public esActualizar: any
  ) {
    this.form = this._fb.group({
      identificacion: '',
      nombres: '',
      apellidos: '',
      fechaNacimiento: '',
      genero: '',
      estudia: '',
      estatura: '',
      descripcionFisica: '',
      identificacionPadre: '',
      identificacionMadre: '',
      action: ''


    });
  }

  ngOnInit(): void {
    this.form.patchValue(this.esActualizar);
  }
  onFormSubmit() {
    if (this.form.valid) {
      if (this.esActualizar) {
        this._hijosService.EditarHijos(this.form.value).subscribe({
          next: (val: any) => {
            this._coreservice.openSnackBar('Hijo actualizado correctamente', 'ok');
            this._dialogRef.close(true)
          },
          error: (err: any) => {
            this._coreservice.openSnackBar(err.error.mensajes, 'error');
          }
        });
      }
      else {
        this._hijosService.GuardarHijos(this.form.value).subscribe({
          next: (val: any) => {
            this._coreservice.openSnackBar('Hijo registrado correctamente', 'ok');
            this._dialogRef.close(true)
          },
          error: (err: any) => {
            this._coreservice.openSnackBar(err.error.mensajes, 'error');
          }
        });

      }
    }

  }
}

