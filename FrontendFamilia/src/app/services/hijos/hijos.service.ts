
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HijosService {

  constructor(private _http: HttpClient) { }

  GuardarHijos(data: any): Observable<any> {
    return this._http.post('http://localhost:11695/api/Hijos/GuardarHijos', data);
  }

  EditarHijos(data: any): Observable<any> {
    return this._http.put('http://localhost:11695/api/Hijos/EditarHijos', data);
  }

  ConsultarListaHijos(): Observable<any> {
    return this._http.get('http://localhost:11695/api/Hijos/ConsultarListaHijos');
  }

  ConsultarHijosLlave(data: any): Observable<any> {
    return this._http.post('http://localhost:11695/api/Hijos/ConsultarHijosLlave', data);
  }

  EliminarHijos​(identificacion: number): Observable<any> {
    return this._http.delete(`http://localhost:11695/api/Hijos/EliminarHijos/${identificacion}`);
  }
}
