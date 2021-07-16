import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from './usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  //declaramos nuestra varioable url endpoint
  private urlEndPoint: string="http://localhost:8080/api/usuarios";
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'});

  //inyectamos http como variable de nuestra clase refiriendoce a HttpClient
  constructor(private http:HttpClient) { }

  getUsuario(): Observable<Usuario[]>{
    //Capturando los datos de nuestro endpoint backend con un Observable de la class model Usuario
    return this.http.get<Usuario[]>(this.urlEndPoint);
  }


  create(usuario: Usuario): Observable<Usuario>{
    return this.http.post<Usuario>(this.urlEndPoint,usuario,{headers: this.httpHeaders});
  }

  getUsuarios(id:number): Observable<Usuario>{
    return this.http.get<Usuario>(`${this.urlEndPoint}/${id}`);
  }

  update(usuario: Usuario):Observable<Usuario>{
    return this.http.put<Usuario>(`${this.urlEndPoint}/${usuario.id}`,usuario,{headers: this.httpHeaders});
  }

  delete(id:number): Observable<Usuario>{
    return this.http.delete<Usuario>(`${this.urlEndPoint}/${id}`,{headers: this.httpHeaders})
  }
}
