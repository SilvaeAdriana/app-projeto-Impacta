import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProdutoService } from '../services/produto.service';
import { Produto } from '../Models/Produto';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-feed-produtos',
  templateUrl: './feed-produtos.component.html',
  styleUrls: ['./feed-produtos.component.css']
})
export class FeedProdutosComponent implements OnInit {
  nomeProduto: string
  usuario = environment.usuario
  produto: Produto = new Produto()
  listaProdutos: Produto[]

  constructor(
    private router: Router,
    private produtoService: ProdutoService
  ){}

  ngOnInit() {
    this.getAllProdutos()
  }

  getAllProdutos(){
    this.produtoService.getAllProdutos().subscribe((resp: Produto[])=>{
      this.listaProdutos = resp
    })
  }

  findByNomeProduto(){

    if(this.nomeProduto ==''){
      this.getAllProdutos()
    }else{
      this.produtoService.getByNomeProduto(this.nomeProduto).subscribe((resp: Produto[])=>{
      this.listaProdutos = resp
    })
    }
  }
}
