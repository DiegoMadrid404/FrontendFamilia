import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PadresComponent } from './padres/padres.component';
import { PadresService } from './services/padres/padres.service';

import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CoreService } from './core/core.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'FrontendFamilia';

  displayedColumns: string[] = ['identificacion', 'nombres', 'apellidos', 'fechaNacimiento', 'genero', 'tipoEmpleo', 'observaciones', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _dialog: MatDialog, private _padresService: PadresService, private _coreservice: CoreService) { }

  ngOnInit(): void {
    this.consultarPadres();
  }
  crearpadres() {
    const dialogoReferencia = this._dialog.open(PadresComponent);
    dialogoReferencia.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.consultarPadres();
        }
      },
    });
  }

  consultarPadres() {
    this._padresService.ConsultarListaPadres().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res.entidades);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.log(err)
      }
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  eliminarpadres(identificacion: number) {
    this._padresService.EliminarPadres(identificacion).subscribe({
      next: (res) => {
        this._coreservice.openSnackBar('Padre eliminado correctamente','ok');
        this.consultarPadres();
      },
      error: (err) => { 
        this._coreservice.openSnackBar('No es posible eliminar un padre con hijos registrados','Error');
      }
    });
  }
  editarpadres(data: any) {
    const dialogoReferencia = this._dialog.open(PadresComponent, { data });
    dialogoReferencia.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.consultarPadres();
        }
      },
    });
  }
}

