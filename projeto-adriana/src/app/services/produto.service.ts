import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Produto } from '../Models/Produto';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(
    private http: HttpClient
  ) { }

  headers = new HttpHeaders()
.set('content-type', 'application/json')
.set('Access-Control-Allow-Origin', '*');


getAllProdutos(): Observable<Produto[]>{
  return this.http.get<Produto[]>(
      'http://localhost:3000/produtos')
}

getByIdPostagem(id: number): Observable<Produto>{
  return this.http.get<Produto>(`http://localhost:3000/produtos/${id}`)
}

getByNomeProduto(nome: string): Observable<Produto[]>{
  return this.http.get<Produto[]>(`http://localhost:3000/produtos/nome/${nome}`)
}

cadastrar(produto: Produto): Observable<Produto>{
  return this.http.post<Produto>(
      'http://localhost:3000/produtos',
        produto, 
        {headers: this.headers}
        )
}
}









