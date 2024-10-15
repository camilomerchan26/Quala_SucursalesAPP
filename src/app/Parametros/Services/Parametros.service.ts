import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DebugElement, Injectable, Input } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Proxy } from '../../Commons/Services/proxy'
import { EntidadCrear } from '../Entities/EntidadCrear';
import { AdminRespuestaCrear } from '../Entities/AdminRespuestaCrear';
import { EntidadEditar } from '../Entities/EntidadEditar';
import { AdminRespuestaEditarOut } from '../Entities/AdminRespuestaEditarOut';
import { catchError, map} from 'rxjs/operators';
import { EntidadSucursalOut } from '../Entities/EntidadSucursalOut';
import { ListaMoneda } from '../Entities/ListaMoneda';



@Injectable({
  providedIn: 'root'
})
export class ParametrosService {

  private myAppUrl = environment.webApiBaseUrl;
  private myApiUrlConsulta = environment.myApiUrlConsulta;
  

  private myAuthUrl = environment.myAuthUrl;

  isPrinting = false;

  constructor(

    private proxy: Proxy,
    private http: HttpClient) { }

    GetSucursales(input: number): Observable<EntidadSucursalOut[]> {
      const url = `${this.myAppUrl}${this.myApiUrlConsulta}ConsultarSucursales?IdSucursal=${input}`;
      debugger;   
      return this.http.get<EntidadSucursalOut[]>(url, 
         {
           headers: new HttpHeaders({
             'Content-Type': 'application/json',
           }),
         }
      ).pipe(
        map((res) => this.mapGetSucursales(res)),
        catchError((error) => {
          console.error('Error en la solicitud:', error);
          return throwError(error);
        })
      );
    }
  
    mapGetSucursales(info: any): EntidadSucursalOut[] {
      debugger;
      let result = <EntidadSucursalOut[]>info;
      return result;
    }



    GetEditar(input:EntidadEditar): Observable<AdminRespuestaEditarOut> {
debugger;
      let response =     
      this.http.post(      this.myAppUrl + 
                           this.myApiUrlConsulta + 
                          'ActualizarSucursal',input).
                           pipe(map((res) => this.mapGetEditar(res)));
    
      return response;
    }
    
    
    mapGetEditar(info: any): AdminRespuestaEditarOut {
      let result = <any>info;
      return result;
    }

    Inactivar(input: number): Observable<AdminRespuestaCrear>{
      debugger;
      const url = `${this.myAppUrl}${this.myApiUrlConsulta}InactivarInactivar?IdSucursal=${input}`;
      debugger;   
      return this.http.post<AdminRespuestaCrear[]>(url, 
         {
           headers: new HttpHeaders({
             'Content-Type': 'application/json',
           }),
         }
      ).pipe(
        map((res) => this.mapInactivar(res)), 
        catchError((error) => {
          console.error('Error en la solicitud:', error);
          return throwError(error);
        })
      );
    }  
  
    mapInactivar(info: any): AdminRespuestaCrear {
      let result = <AdminRespuestaCrear>info;
      return result;
    }

    GetCrear(input: EntidadCrear): Observable<AdminRespuestaCrear>{
      debugger;
      let response =
        this.http.post(
          this.myAppUrl +
          this.myApiUrlConsulta +
          'CrearSucursal', input).
          pipe(map((res) => this.mapCrearResponse(res)));
  
      return response;
  
    }  
  
    mapCrearResponse(info: any): AdminRespuestaCrear {
      let result = <AdminRespuestaCrear>info;
      return result;
    }

  Getlista(ListaMoneda ) {
    debugger;
    const url = `${this.myAppUrl}${this.myApiUrlConsulta}ConsultarMonedas`;
    debugger;
    return this.http.get<ListaMoneda[]>(url,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      }
    ).pipe(
      map((res) => this.mapGetLista(res)),
      catchError((error) => {
        console.error('Error en la solicitud:', error);
        return throwError(error);
      })
    );
  }


  mapGetLista(info: ListaMoneda[]): ListaMoneda[] {
    debugger;
    let result = info;
    return result;
  }


   

    
}