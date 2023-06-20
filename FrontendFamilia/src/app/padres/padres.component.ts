import { Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PadresService } from '../services/padres/padres.service';
import { CoreService } from '../core/core.service';

@Component({
  selector: 'app-padres',
  templateUrl: './padres.component.html',
  styleUrls: ['./padres.component.scss']
})
export class PadresComponent implements OnInit {
  form: FormGroup;


  constructor(private _fb: FormBuilder,
    private _padresService: PadresService,
    private _dialogRef: MatDialogRef<PadresComponent>,
    private _coreservice: CoreService,
    @Inject(MAT_DIALOG_DATA) public esActualizar: any
  ) {
    this.form = this._fb.group({
      identificacion: '',
      nombres: '',
      apellidos: '',
      fechaNacimiento: '',
      genero: '',
      tipoEmpleo: '',
      experienciaLaboral: '',
      observaciones: ''
    });
  }

  ngOnInit(): void {
    this.form.patchValue(this.esActualizar);
  }
  onFormSubmit() {
    if (this.form.valid) {
      if (this.esActualizar) {
        this._padresService.EditarPadres(this.form.value).subscribe({
          next: (val: any) => {
            this._coreservice.openSnackBar('Padre actualizado correctamente', 'ok');
            this._dialogRef.close(true)
          },
          error: (err: any) => {
            this._coreservice.openSnackBar(err.error.mensajes, 'error');
          }
        });
      }
      else {

        this._padresService.GuardarPadres(this.form.value).subscribe({
          next: (val: any) => {
            this._coreservice.openSnackBar('Padre registrado correctamente', 'ok');
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

