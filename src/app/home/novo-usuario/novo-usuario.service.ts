import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NovoUsuario } from './novo-usuario';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NovoUsuarioService {
  constructor(private http: HttpClient) {}

  reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'No-Auth': 'True' });

  cadastraNovoUsuario(novoUsuario: NovoUsuario): Observable<any> {
    let endpoint = environment.endpoint.usuario + '/saveUsuario/';

    let body = {
      "usuarioNomeCompleto": novoUsuario.fullName,
      "usuarioEmail": novoUsuario.email,
      "usuarioUserName": novoUsuario.userName,
      "usuarioPassword": novoUsuario.password,
    }

    return this.http.post<any>(endpoint, body , {headers: this.reqHeader}).pipe(
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  verificaUsuarioExistente(nomeUsuario: string): Observable<any> {
    let endpoint = environment.endpoint.usuario + '/' + nomeUsuario;

    return this.http.get<any>(endpoint, {headers: this.reqHeader}).pipe(
      catchError((error) => {
        return throwError(error);
      })
    );
  }

}
