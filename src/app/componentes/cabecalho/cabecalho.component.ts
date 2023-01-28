import { AutenticacaoService } from 'src/app/autenticacao/autenticacao.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/autenticacao/usuario/usuario.service';

@Component({
  selector: 'app-cabecalho',
  templateUrl: './cabecalho.component.html',
  styleUrls: ['./cabecalho.component.css'],
})
export class CabecalhoComponent {
  user$ = this.usuarioService.retornaUsuario();

  constructor(
    public authService: AutenticacaoService,
    private usuarioService: UsuarioService,
    private router: Router) {
    }

  logout() {
    this.authService.autenticado = false;
    localStorage.clear();
    // this.usuarioService.logout();
    this.router.navigate(['']);
  }
}
