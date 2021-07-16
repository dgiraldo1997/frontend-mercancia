import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Mercancia } from './mercancia.model';

@Injectable({
  providedIn: 'root'
})
export class MercanciaService {

  private urlEndPoint: string="http://localhost:8080/api/mercancias";
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'});

  constructor(private http:HttpClient) { }

  
  getMercancia(): Observable<Mercancia[]>{
    //Capturando los datos de nuestro endpoint backend con un Observable de la class model Usuario
    return this.http.get<Mercancia[]>(this.urlEndPoint);
  }

  create(mercancia: Mercancia): Observable<Mercancia>{
    return this.http.post<Mercancia>(this.urlEndPoint,mercancia,{headers: this.httpHeaders});
  }

  getMercancias(id:number): Observable<Mercancia>{
    return this.http.get<Mercancia>(`${this.urlEndPoint}/${id}`);
  }

  update(mercancia: Mercancia):Observable<Mercancia>{
    return this.http.put<Mercancia>(`${this.urlEndPoint}/${mercancia.id}`,mercancia,{headers: this.httpHeaders});
  }

  delete(id:number): Observable<Mercancia>{
    return this.http.delete<Mercancia>(`${this.urlEndPoint}/${id}`,{headers: this.httpHeaders})
  }

  getMercanciaByNombre(nombre:string): Observable<Mercancia[]>{
    //Capturando los datos de nuestro endpoint backend con un Observable de la class model Usuario
    return this.http.get<Mercancia[]>(`${this.urlEndPoint}/buscar/${nombre}`);
  }

}
