import { Component } from '@angular/core';
import { Usuario } from '../Models/Usuario';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.css']
})
export class CadastroUsuarioComponent {

  usuario: Usuario = new Usuario;
  confirmarSenha: string;
  tipoUsuario: string

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  confirmSenha(event: any)  {
    this.confirmarSenha = event.target.value

  }

  tipoUser(event: any){
    this.tipoUsuario = event.target.value
    console.log(this.tipoUsuario)
  }

  cadastrar(){
    this.usuario.tipo = this.tipoUsuario

    if(this.usuario.senha != this.confirmarSenha){
    alert('A senhas estão incorretas')
  } else {
    this.authService.cadastrar(this.usuario).subscribe((resp: Usuario) => {
      this.usuario = resp
      this.router.navigate(['/login'])
      alert('Usuário cadastrado com sucesso!')
    })
  }
}
}
