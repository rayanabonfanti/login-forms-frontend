import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AutenticacaoDTO } from './autenticacaoDTO.model';

@Injectable({
  providedIn: 'root',
})
export class AutenticacaoService {
  
  constructor(private httpClient: HttpClient) {}

  autenticacaoDTO = new AutenticacaoDTO();

  reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'No-Auth': 'True' });

  autenticar(autenticacaoDTO: AutenticacaoDTO): Observable<any> {
    let endpoint = environment.endpoint.usuario + '/autenticacaoLogin/';

    let body = {
      "usuarioUserName": autenticacaoDTO.userName,
      "usuarioPassword": autenticacaoDTO.password,
    }

    return this.httpClient.post<any>(endpoint, body , {headers: this.reqHeader}).pipe(
      catchError((error) => {
        return throwError(error);
      })
    );

  }
}
