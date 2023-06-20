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
import { HijosComponent } from './hijos/hijos.component';
import { HijosService } from './services/hijos/hijos.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'FrontendFamilia';

  displayedColumnsPadres: string[] = ['identificacion', 'nombres', 'apellidos', 'fechaNacimiento', 'genero', 'tipoEmpleo','experienciaLaboral', 'observaciones', 'action'];
  dataSourcePadres!: MatTableDataSource<any>;
  
  displayedColumnsHijos: string[] = ['identificacion', 'nombres', 'apellidos', 'fechaNacimiento', 'genero', 'estudia', 'estatura','descripcionFisica','identificacionPadre','identificacionMadre', 'action'];
  dataSourceHijos!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _dialog: MatDialog, private _padresService: PadresService, private _hijosService: HijosService, private _coreservice: CoreService) { }

  ngOnInit(): void {
    this.consultarPadres();
    this.consultarHijos();
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
  crearHijos() {
    const dialogoReferencia = this._dialog.open(HijosComponent);
    dialogoReferencia.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.consultarHijos();
        }
      },
    });
  }
  consultarPadres() {
    this._padresService.ConsultarListaPadres().subscribe({
      next: (res) => {
        this.dataSourcePadres = new MatTableDataSource(res.entidades);
        this.dataSourcePadres.sort = this.sort;
        this.dataSourcePadres.paginator = this.paginator;
      },
      error: (err) => {
        console.log(err)
      }
    });
  }
  consultarHijos() {
    this._hijosService.ConsultarListaHijos().subscribe({
      next: (res) => {
        this.dataSourceHijos = new MatTableDataSource(res.entidades);
        this.dataSourceHijos.sort = this.sort;
        this.dataSourceHijos.paginator = this.paginator;
      },
      error: (err) => {
        console.log(err)
      }
    });
  }


  applyFilterPadres(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourcePadres.filter = filterValue.trim().toLowerCase();

    if (this.dataSourcePadres.paginator) {
      this.dataSourcePadres.paginator.firstPage();
    }
  }

  
  applyFilterHijos(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceHijos.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceHijos.paginator) {
      this.dataSourceHijos.paginator.firstPage();
    }
  }
  eliminarpadres(identificacion: number) {
    this._padresService.EliminarPadres(identificacion).subscribe({
      next: (res) => {
        this._coreservice.openSnackBar('Padre eliminado correctamente', 'ok');
        this.consultarPadres();
      },
      error: (err) => {
        this._coreservice.openSnackBar('No es posible eliminar un padre con hijos registrados', 'Error');
      }
    });
  }
  eliminarHijos(identificacion: number) {
    this._hijosService.EliminarHijos(identificacion).subscribe({
      next: (res) => {
        this._coreservice.openSnackBar('Hijo eliminado correctamente', 'ok');
        this.consultarPadres();
      },
      error: (err) => {
        console.log(err)
      }
    });
  } 
  editarHijos(data: any) {
    const dialogoReferencia = this._dialog.open(HijosComponent, { data });
    dialogoReferencia.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.consultarHijos();
        }
      },
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

