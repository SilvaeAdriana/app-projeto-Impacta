import { Component, OnInit } from '@angular/core';
import { Produto } from '../Models/Produto';
import { Router } from '@angular/router';
import { ProdutoService } from '../services/produto.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-cadastro-produto',
  templateUrl: './cadastro-produto.component.html',
  styleUrls: ['./cadastro-produto.component.css']
})
export class CadastroProdutoComponent {
  produto: Produto = new Produto()
  listaProdutos: Produto[]
  tipoCategoria: string = 'Utensílio doméstico'

  constructor(
    private router: Router,
    private produtoService : ProdutoService
  ){}


  getAllProdutos(){
    this.produtoService.getAllProdutos().subscribe((resp: Produto[])=>{
      this.listaProdutos = resp
    })

    console.log(this.listaProdutos.length)
  }

  selecionarCategoria(event: any){
    this.tipoCategoria = event.target.value
    console.log(this.tipoCategoria)
  }

  cadastrar() {
    if(environment.id === 0) {
      alert('Usuário não está logado');
    } else {
      this.produto.usuario_id = environment.id
      this.produto.categoria = this.tipoCategoria
      this.produtoService.cadastrar(this.produto).subscribe((resp: Produto)=>{
      this.produto = resp
      this.router.navigate(['/feed-produtos'])
      alert('Postagem realizada com sucesso!')


  })
    }
}

}
