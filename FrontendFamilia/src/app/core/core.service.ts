import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  constructor(private _snackBar: MatSnackBar) { 
  }
  openSnackBar(mensaje:any,accion:string='ok') {
    this._snackBar.open(mensaje, accion, {
      duration:  1000,
      verticalPosition: 'top'
    });
  }
}
