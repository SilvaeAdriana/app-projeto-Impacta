import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Produto } from '../Models/Produto';
import { Observable } from 'rxjs/internal/Observable';
import { ProdutoReservado } from '../Models/ProdutoReservado';

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

getByIdProduto(id: number): Observable<Produto>{
  return this.http.get<Produto>(`http://localhost:3000/produtos/${id}`)
}

getProdutosReservados(id: number): Observable<Produto[]>{
  return this.http.get<Produto[]>(`http://localhost:3000/produtos/produto-reservado/${id}`)
}

getByCategoriaProduto(categoria: string): Observable<Produto[]>{
  return this.http.get<Produto[]>(`http://localhost:3000/produtos/categoria/${categoria}`)
}

cadastrar(produto: Produto): Observable<Produto>{
  return this.http.post<Produto>(
      'http://localhost:3000/produtos',
        produto,
        {headers: this.headers}
        )
}

atualizarProduto(id: number, produto: Produto): Observable<Produto>{
  return this.http.put<Produto>(`http://localhost:3000/produtos/${id}`, produto, {headers: this.headers})
}

reservar(produto_reservado: ProdutoReservado): Observable<ProdutoReservado>{
  return this.http.post<ProdutoReservado>(
      'http://localhost:3000/produtos/produto-reservado',
        produto_reservado,
        {headers: this.headers}
        )
}
}









