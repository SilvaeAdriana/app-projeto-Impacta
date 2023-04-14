import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from '../Models/Usuario';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  headers = new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Access-Control-Allow-Origin', '*');

  

  entrar(usuario: Usuario): Observable <Usuario>{
    return this.http.post<Usuario>('http://localhost:3000/usuarios/login', usuario)
  
    }

    cadastrar(usuario : Usuario): Observable<Usuario>{
      return this.http.post<Usuario>(
          'http://localhost:3000/usuarios/cadastrar',
            usuario, 
            {headers: this.headers}
            )
  
    }
  

}
