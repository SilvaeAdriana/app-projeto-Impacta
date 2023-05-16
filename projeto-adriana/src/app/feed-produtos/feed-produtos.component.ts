import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProdutoService } from '../services/produto.service';
import { Produto } from '../Models/Produto';
import { environment } from 'src/environments/environment.prod';
import { ProdutoReservado } from '../Models/ProdutoReservado';

@Component({
  selector: 'app-feed-produtos',
  templateUrl: './feed-produtos.component.html',
  styleUrls: ['./feed-produtos.component.css']
})
export class FeedProdutosComponent implements OnInit {
  categoriaProduto: string
  usuario = environment.usuario
  produto: Produto = new Produto()
  produto_reservado: ProdutoReservado = new ProdutoReservado()
  listaProdutos: Produto[]

  constructor(
    private router: Router,
    private produtoService: ProdutoService
  ){}

  ngOnInit() {
    this.getAllProdutos()
  }

  getAllProdutos(){
    this.listaProdutos = [];
    this.produtoService.getAllProdutos().subscribe((resp: Produto[])=>{
      this.listaProdutos = resp
    })
  }

  getProdutosReservados() {
    this.listaProdutos = [];
    if(environment.id === 0){
      alert('Usuário não está logado');
    } else{
      this.produtoService.getProdutosReservados(environment.id).subscribe((resp: Produto[])=> {
        this.listaProdutos = resp
      })
    }
  }

  findByCategoriaProduto(){

    if(this.categoriaProduto == ''){
      this.getAllProdutos()
    }else{
      this.produtoService.getByCategoriaProduto(this.categoriaProduto).subscribe((resp: Produto[])=>{
      this.listaProdutos = resp
    })
    }
  }

  reservar(produto_id: number, usuario_id: number) {
   this.produto_reservado.produto_id = produto_id,
    this.produto_reservado.usuario_id = environment.id

    if(environment.id === 0){
      alert('Usuário não está logado');
    } else if (usuario_id === environment.id){
      alert('Esse produto pertence ao usuário logado');
    } else {
      this.produtoService.reservar(this.produto_reservado).subscribe((resp: ProdutoReservado) => {
        this.produto_reservado = resp
      });
      this.getAllProdutos();
    }



  }

}
