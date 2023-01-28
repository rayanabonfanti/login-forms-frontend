import { UsuarioService } from './usuario/usuario.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AutenticacaoDTO } from './autenticacaoDTO.model';
import { Usuario } from './usuario/usuario';
import { UsuarioResponseDTO } from './usuario/UsuarioResponseDTO.mode';

@Injectable({
  providedIn: 'root',
})
export class AutenticacaoService {
  
  constructor(
    private httpClient: HttpClient,
    private usuarioService: UsuarioService,
  ) {}

  autenticacaoDTO = new AutenticacaoDTO();
  usuarioResponseDTO = new UsuarioResponseDTO();
  autenticado: boolean = false;

  reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'No-Auth': 'True' });

  set setDadosUsuario(usuario: UsuarioResponseDTO) {
    localStorage.setItem('dadosUsuario', JSON.stringify(usuario));
  }

  get getDadosUsuario(): UsuarioResponseDTO {
    let dados = JSON.parse(localStorage.getItem('dadosUsuario') as string);
    return dados;
  }

  set setDadosUsuarioName(usuarioName: string) {
    localStorage.setItem('dadosUsuarioName', usuarioName);
  }
  
  get getDadosUsuarioName() {
    return localStorage.getItem('dadosUsuarioName');
  }

  autenticar(autenticacaoDTO: AutenticacaoDTO): Observable<Object> {
    let endpoint = environment.endpoint.usuario + '/autenticacaoLogin/';

    let body = {
      "usuarioUserName": autenticacaoDTO.userName,
      "usuarioPassword": autenticacaoDTO.password,
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(autenticacaoDTO.userName + ':' + autenticacaoDTO.password)
      })
    };

    return this.httpClient.post(endpoint, body , httpOptions).pipe(
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  // autenticar(autenticacaoDTO: AutenticacaoDTO): Observable<any> {
  //   let endpoint = environment.endpoint.usuario + '/autenticacaoLogin/';
  //   let body = {
  //     "usuarioUserName": autenticacaoDTO.userName,
  //     "usuarioPassword": autenticacaoDTO.password,
  //   }
  //   return this.httpClient.post<any>(endpoint, body , {headers: this.reqHeader}).pipe(
  //     catchError((error) => {
  //       return throwError(error);
  //     })
  //   );
  // }

  // autenticar(autenticacaoDTO: AutenticacaoDTO): Observable<HttpResponse<any>> {
  //   let endpoint = environment.endpoint.usuario + '/autenticacaoLogin/';
  //   let body = {
  //     "usuarioUserName": autenticacaoDTO.userName,
  //     "usuarioPassword": autenticacaoDTO.password,
  //   }
  //   return this.httpClient.post<any>(endpoint, body , { observe: 'response' }).pipe(
  //     tap((res) => {
  //       const authToken = res.headers.get('x-access-token') ?? '';
  //       this.usuarioService.salvaToken(authToken);
  //     }),
  //     catchError((error) => {
  //       return throwError(error);
  //     })
  //   );
  // }

}
