import { Component, OnInit } from '@angular/core';
import { Usuario } from '../Models/Usuario';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  usuario: Usuario = new Usuario
  
constructor(
  private authService: AuthService,
  private router: Router,
) { }

entrar(){
  this.authService.entrar(this.usuario).subscribe((resp: Usuario)=> {
    this.usuario= resp

    environment.nome = this.usuario.nome
    environment.usuario = this.usuario.usuario
    environment.id = this.usuario.id

    this.router.navigate(['/feed-produtos'])
  }, erro =>{
    if(erro.status == 500){
      alert('Usuário e/ou Senha estão incorretos!')
    }
  })
}
}
