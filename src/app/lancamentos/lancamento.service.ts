import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';


export interface LancamentoFilter {
    descricao : string;
}

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  lancamentosURL = 'http://localhost:8080/lancamentos';

  constructor(private http:HttpClient) {  }

  pesquisar(filtro : LancamentoFilter): Promise<any> {
    
    let params = new HttpParams(); // parâmnetros de pesquisa da URL
    const headers = new HttpHeaders().append('Authorization', 
    'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJhZG1pbkBybHNwbW9uZXkuY29tIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl0sIm5vbWUiOiJBZG1pbmlzdHJhZG9yIiwiZXhwIjoxNTk1OTYzNzM0LCJhdXRob3JpdGllcyI6WyJST0xFX0NBREFTVFJBUl9DQVRFR09SSUEiLCJST0xFX1BFU1FVSVNBUl9QRVNTT0EiLCJST0xFX1JFTU9WRVJfUEVTU09BIiwiUk9MRV9DQURBU1RSQVJfTEFOQ0FNRU5UTyIsIlJPTEVfUEVTUVVJU0FSX0xBTkNBTUVOVE8iLCJST0xFX1JFTU9WRVJfTEFOQ0FNRU5UTyIsIlJPTEVfQ0FEQVNUUkFSX1BFU1NPQSIsIlJPTEVfUEVTUVVJU0FSX0NBVEVHT1JJQSJdLCJqdGkiOiJmMTk3MjYwYy1mMzgxLTQ3OGQtODg0NC01NTkwZmQ5ZGE1MjYiLCJjbGllbnRfaWQiOiJhbmd1bGFyIn0.MO_nMfXrrdH1DHsRpAl6Z2cMelaMBLTI0pPLR4aURlk');
    //const headers = new HttpHeaders().append('Authorization', 'Basic YW5ndWxhcjpAYW5ndWxAcjA=');

    if (typeof filtro.descricao !== 'undefined' && filtro.descricao.length > 0) {
      params = params.set('descricao', filtro.descricao);// atribui filtro.descricao para dentro de 'descricao'
      }
    // if (filtro.descricao){
    //   params = params.set('descricao', filtro.descricao); 
    // }
    
    return this.http.get(`${this.lancamentosURL}?resumo`, { headers, params })
        .toPromise()
        .then(response => response['content']);
}
}
