import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PadresService {

  constructor(private _http: HttpClient) { }

  GuardarPadres(data: any): Observable<any> {
    return this._http.post('http://localhost:11695/api/Padres/GuardarPadres', data);
  }

  EditarPadres(data: any): Observable<any> {
    return this._http.put('http://localhost:11695/api/Padres/EditarPadres', data);
  }

  ConsultarListaPadres(): Observable<any> {
    return this._http.get('http://localhost:11695/api/Padres/ConsultarListaPadres');
  }

  ConsultarPadresLlave(data: any): Observable<any> {
    return this._http.post('http://localhost:11695/api/Padres/ConsultarPadresLlave', data);
  }

  EliminarPadres(identificacion: number): Observable<any> { 
    return this._http.delete(`http://localhost:11695/api/Padres/EliminarPadres/${identificacion}`);

  }
}
