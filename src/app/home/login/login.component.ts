import { AutenticacaoDTO } from './../../autenticacao/autenticacaoDTO.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticacaoService } from 'src/app/autenticacao/autenticacao.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  
  autenticacaoLoginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AutenticacaoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.autenticacaoLoginForm = this.formBuilder.group(
      {
        usuario: ['', [Validators.required]],
        password: ['', [Validators.required]],
      });
  }

  login() {
    this.authService.autenticacaoDTO.userName = this.autenticacaoLoginForm.value.usuario;
    this.authService.autenticacaoDTO.password = this.autenticacaoLoginForm.value.password;
    console.log(this.authService.autenticacaoDTO);
    this.authService.autenticar(this.authService.autenticacaoDTO).subscribe(
      (data) => {
        if(data){
          this.router.navigate(['animais']);
        } else {
          alert('Usuário ou senha inválido');
          console.log("data error");
        }
      },
      (error) => {
        alert('Usuário ou senha inválido');
        console.log(error);
      }
    );
  }
}
