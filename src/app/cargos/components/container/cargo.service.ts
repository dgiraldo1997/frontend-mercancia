import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cargo } from './cargo.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CargoService {

  private urlEndPoint: string='http://localhost:8080/api/cargos';
  private httpHeaders= new HttpHeaders({'Content-Type':'application/json'});

  constructor(private http: HttpClient) { }

  getCargos(): Observable<Cargo[]>{
    return this.http.get<Cargo[]>(this.urlEndPoint);
  }

  create(cargo: Cargo): Observable<Cargo>{
    return this.http.post<Cargo>(this.urlEndPoint,cargo,{headers: this.httpHeaders});
  }

  getCargo(id:number): Observable<Cargo>{
    return this.http.get<Cargo>(`${this.urlEndPoint}/${id}`,{headers: this.httpHeaders});
  }

  update(cargo: Cargo): Observable<Cargo>{
    return this.http.put<Cargo>(`${this.urlEndPoint}/${cargo.id}`,cargo,{headers: this.httpHeaders})
  }
  
  delete(id:number): Observable<Cargo>{
    return this.http.delete<Cargo>(`${this.urlEndPoint}/${id}`,{headers: this.httpHeaders})
  }

}
