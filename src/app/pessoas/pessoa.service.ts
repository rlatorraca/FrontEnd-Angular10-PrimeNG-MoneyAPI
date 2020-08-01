import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import * as moment from 'moment'



export class PessoaFilter {
    nome : string;    
    pagina = 0;
    itensPorPagina = 5;
}

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  pessoaURL = 'http://localhost:8080/pessoas';

  constructor(private http:HttpClient) {  }

  pesquisar(filtro : PessoaFilter): Promise<any> {
    
    let params = new HttpParams(); // parâmnetros de pesquisa da URL
    const headers = new HttpHeaders().append('Authorization', 
    'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJhZG1pbkBybHNwbW9uZXkuY29tIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl0sIm5vbWUiOiJBZG1pbmlzdHJhZG9yIiwiZXhwIjoxNTk4NjI2NjgzLCJhdXRob3JpdGllcyI6WyJST0xFX0NBREFTVFJBUl9DQVRFR09SSUEiLCJST0xFX1BFU1FVSVNBUl9QRVNTT0EiLCJST0xFX1JFTU9WRVJfUEVTU09BIiwiUk9MRV9DQURBU1RSQVJfTEFOQ0FNRU5UTyIsIlJPTEVfUEVTUVVJU0FSX0xBTkNBTUVOVE8iLCJST0xFX1JFTU9WRVJfTEFOQ0FNRU5UTyIsIlJPTEVfQ0FEQVNUUkFSX1BFU1NPQSIsIlJPTEVfUEVTUVVJU0FSX0NBVEVHT1JJQSJdLCJqdGkiOiIyMjYyMGY0Zi00MWZkLTRjODItODUyMS02NTdiNmIwODI0ODYiLCJjbGllbnRfaWQiOiJhbmd1bGFyIn0.t-bN3Rbfk_bFsChzjuT5hJb2ZWxdz1YqhZkKIS4tlzs');
    //const headers = new HttpHeaders().append('Authorization', 'Basic YW5ndWxhcjpAYW5ndWxAcjA=');

    params = params.set('page', filtro.pagina.toString());
    params = params.set('size', filtro.itensPorPagina.toString())

    if (filtro.nome) {
      params = params.set('nome', filtro.nome);// atribui filtro.descricao para dentro de 'descricao'
     }

  
    return this.http.get(`${this.pessoaURL}`, { headers, params })
        .toPromise()
        .then(response => {
          const pessoas = response['content'];
          const resultado = {
            pessoas,
            total: response['totalElements']
          }
          return resultado;
        })
      
  }

  listarTodas(): Promise<any> {    
    const headers =  new HttpHeaders().append('Authorization', 
    'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJhZG1pbkBybHNwbW9uZXkuY29tIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl0sIm5vbWUiOiJBZG1pbmlzdHJhZG9yIiwiZXhwIjoxNTk4NjI2NjgzLCJhdXRob3JpdGllcyI6WyJST0xFX0NBREFTVFJBUl9DQVRFR09SSUEiLCJST0xFX1BFU1FVSVNBUl9QRVNTT0EiLCJST0xFX1JFTU9WRVJfUEVTU09BIiwiUk9MRV9DQURBU1RSQVJfTEFOQ0FNRU5UTyIsIlJPTEVfUEVTUVVJU0FSX0xBTkNBTUVOVE8iLCJST0xFX1JFTU9WRVJfTEFOQ0FNRU5UTyIsIlJPTEVfQ0FEQVNUUkFSX1BFU1NPQSIsIlJPTEVfUEVTUVVJU0FSX0NBVEVHT1JJQSJdLCJqdGkiOiIyMjYyMGY0Zi00MWZkLTRjODItODUyMS02NTdiNmIwODI0ODYiLCJjbGllbnRfaWQiOiJhbmd1bGFyIn0.t-bN3Rbfk_bFsChzjuT5hJb2ZWxdz1YqhZkKIS4tlzs');

    return this.http.get(`${this.pessoaURL}`, { headers } )
      .toPromise()
      .then(response => response['content']);
  }

  excluir(codigo: number): Promise<void> {
    const headers = new HttpHeaders().append('Authorization', 
    'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJhZG1pbkBybHNwbW9uZXkuY29tIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl0sIm5vbWUiOiJBZG1pbmlzdHJhZG9yIiwiZXhwIjoxNTk4NjI2NjgzLCJhdXRob3JpdGllcyI6WyJST0xFX0NBREFTVFJBUl9DQVRFR09SSUEiLCJST0xFX1BFU1FVSVNBUl9QRVNTT0EiLCJST0xFX1JFTU9WRVJfUEVTU09BIiwiUk9MRV9DQURBU1RSQVJfTEFOQ0FNRU5UTyIsIlJPTEVfUEVTUVVJU0FSX0xBTkNBTUVOVE8iLCJST0xFX1JFTU9WRVJfTEFOQ0FNRU5UTyIsIlJPTEVfQ0FEQVNUUkFSX1BFU1NPQSIsIlJPTEVfUEVTUVVJU0FSX0NBVEVHT1JJQSJdLCJqdGkiOiIyMjYyMGY0Zi00MWZkLTRjODItODUyMS02NTdiNmIwODI0ODYiLCJjbGllbnRfaWQiOiJhbmd1bGFyIn0.t-bN3Rbfk_bFsChzjuT5hJb2ZWxdz1YqhZkKIS4tlzs');

    return this.http.delete(`${this.pessoaURL}/${codigo}`, { headers })
      .toPromise()
      .then(() => null);
  }

  mudarStatus(codigo: number, ativo: boolean): Promise<void> {
    
    const headers =  new HttpHeaders().set('Authorization', 
    'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJhZG1pbkBybHNwbW9uZXkuY29tIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl0sIm5vbWUiOiJBZG1pbmlzdHJhZG9yIiwiZXhwIjoxNTk4NjI2NjgzLCJhdXRob3JpdGllcyI6WyJST0xFX0NBREFTVFJBUl9DQVRFR09SSUEiLCJST0xFX1BFU1FVSVNBUl9QRVNTT0EiLCJST0xFX1JFTU9WRVJfUEVTU09BIiwiUk9MRV9DQURBU1RSQVJfTEFOQ0FNRU5UTyIsIlJPTEVfUEVTUVVJU0FSX0xBTkNBTUVOVE8iLCJST0xFX1JFTU9WRVJfTEFOQ0FNRU5UTyIsIlJPTEVfQ0FEQVNUUkFSX1BFU1NPQSIsIlJPTEVfUEVTUVVJU0FSX0NBVEVHT1JJQSJdLCJqdGkiOiIyMjYyMGY0Zi00MWZkLTRjODItODUyMS02NTdiNmIwODI0ODYiLCJjbGllbnRfaWQiOiJhbmd1bGFyIn0.t-bN3Rbfk_bFsChzjuT5hJb2ZWxdz1YqhZkKIS4tlzs')    .set('Content-Type', 'application/json');
    

    return this.http.put(`${this.pessoaURL}/${codigo}/ativo`, ativo, { headers })
      .toPromise()
      .then(() => null);
  }
}
