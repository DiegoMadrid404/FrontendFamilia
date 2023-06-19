import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PadresComponent } from './padres/padres.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'FrontendFamilia';
  constructor(private _dialog: MatDialog) { }

  mostrarDetallesPadres() {
    this._dialog.open(PadresComponent);
  }
}

