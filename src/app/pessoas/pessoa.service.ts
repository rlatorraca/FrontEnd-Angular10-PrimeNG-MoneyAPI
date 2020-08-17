import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Pessoa, Estado, Cidade } from './../core/model';
import { environment } from './../../environments/environment';

export class PessoaFilter {
    nome : string;
    pagina = 0;
    itensPorPagina = 5;
}

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  pessoaURL :string;
  cidadesURL : string;
  estadosURL : string;

  constructor(private http:HttpClient) {
    this.pessoaURL = `${environment.apiURL}/pessoas`;
    this.estadosURL = `${environment.apiURL}/estados`;
    this.cidadesURL = `${environment.apiURL}/cidades`;
   }

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
    // const headers =  new HttpHeaders().append('Authorization',
    // 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJhZG1pbkBybHNwbW9uZXkuY29tIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl0sIm5vbWUiOiJBZG1pbmlzdHJhZG9yIiwiZXhwIjoxNTk4NjI2NjgzLCJhdXRob3JpdGllcyI6WyJST0xFX0NBREFTVFJBUl9DQVRFR09SSUEiLCJST0xFX1BFU1FVSVNBUl9QRVNTT0EiLCJST0xFX1JFTU9WRVJfUEVTU09BIiwiUk9MRV9DQURBU1RSQVJfTEFOQ0FNRU5UTyIsIlJPTEVfUEVTUVVJU0FSX0xBTkNBTUVOVE8iLCJST0xFX1JFTU9WRVJfTEFOQ0FNRU5UTyIsIlJPTEVfQ0FEQVNUUkFSX1BFU1NPQSIsIlJPTEVfUEVTUVVJU0FSX0NBVEVHT1JJQSJdLCJqdGkiOiIyMjYyMGY0Zi00MWZkLTRjODItODUyMS02NTdiNmIwODI0ODYiLCJjbGllbnRfaWQiOiJhbmd1bGFyIn0.t-bN3Rbfk_bFsChzjuT5hJb2ZWxdz1YqhZkKIS4tlzs');

    //return this.http.get(`${this.pessoaURL}` { headers })
    return this.http.get(`${this.pessoaURL}` )
      .toPromise()
      .then(response => response['content']);
  }

  excluir(codigo: number): Promise<void> {
    // const headers = new HttpHeaders().append('Authorization',
    // 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJhZG1pbkBybHNwbW9uZXkuY29tIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl0sIm5vbWUiOiJBZG1pbmlzdHJhZG9yIiwiZXhwIjoxNTk4NjI2NjgzLCJhdXRob3JpdGllcyI6WyJST0xFX0NBREFTVFJBUl9DQVRFR09SSUEiLCJST0xFX1BFU1FVSVNBUl9QRVNTT0EiLCJST0xFX1JFTU9WRVJfUEVTU09BIiwiUk9MRV9DQURBU1RSQVJfTEFOQ0FNRU5UTyIsIlJPTEVfUEVTUVVJU0FSX0xBTkNBTUVOVE8iLCJST0xFX1JFTU9WRVJfTEFOQ0FNRU5UTyIsIlJPTEVfQ0FEQVNUUkFSX1BFU1NPQSIsIlJPTEVfUEVTUVVJU0FSX0NBVEVHT1JJQSJdLCJqdGkiOiIyMjYyMGY0Zi00MWZkLTRjODItODUyMS02NTdiNmIwODI0ODYiLCJjbGllbnRfaWQiOiJhbmd1bGFyIn0.t-bN3Rbfk_bFsChzjuT5hJb2ZWxdz1YqhZkKIS4tlzs');

    //return this.http.delete(`${this.pessoaURL}/${codigo}`, { headers })
    return this.http.delete(`${this.pessoaURL}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  mudarStatus(codigo: number, ativo: boolean): Promise<void> {

    //const headers =  new HttpHeaders().set('Authorization',
    //'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJhZG1pbkBybHNwbW9uZXkuY29tIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl0sIm5vbWUiOiJBZG1pbmlzdHJhZG9yIiwiZXhwIjoxNTk4NjI2NjgzLCJhdXRob3JpdGllcyI6WyJST0xFX0NBREFTVFJBUl9DQVRFR09SSUEiLCJST0xFX1BFU1FVSVNBUl9QRVNTT0EiLCJST0xFX1JFTU9WRVJfUEVTU09BIiwiUk9MRV9DQURBU1RSQVJfTEFOQ0FNRU5UTyIsIlJPTEVfUEVTUVVJU0FSX0xBTkNBTUVOVE8iLCJST0xFX1JFTU9WRVJfTEFOQ0FNRU5UTyIsIlJPTEVfQ0FEQVNUUkFSX1BFU1NPQSIsIlJPTEVfUEVTUVVJU0FSX0NBVEVHT1JJQSJdLCJqdGkiOiIyMjYyMGY0Zi00MWZkLTRjODItODUyMS02NTdiNmIwODI0ODYiLCJjbGllbnRfaWQiOiJhbmd1bGFyIn0.t-bN3Rbfk_bFsChzjuT5hJb2ZWxdz1YqhZkKIS4tlzs')    .set('Content-Type', 'application/json');


    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');
    return this.http.put(`${this.pessoaURL}/${codigo}/ativo`, ativo,  { headers })
      .toPromise()
      .then(() => null);
  }

  adicionar(pessoa: Pessoa): Promise<Pessoa> {

    // const headers = new HttpHeaders()
    // .set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJhZG1pbkBybHNwbW9uZXkuY29tIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl0sIm5vbWUiOiJBZG1pbmlzdHJhZG9yIiwiZXhwIjoxNTk4NjI2NjgzLCJhdXRob3JpdGllcyI6WyJST0xFX0NBREFTVFJBUl9DQVRFR09SSUEiLCJST0xFX1BFU1FVSVNBUl9QRVNTT0EiLCJST0xFX1JFTU9WRVJfUEVTU09BIiwiUk9MRV9DQURBU1RSQVJfTEFOQ0FNRU5UTyIsIlJPTEVfUEVTUVVJU0FSX0xBTkNBTUVOVE8iLCJST0xFX1JFTU9WRVJfTEFOQ0FNRU5UTyIsIlJPTEVfQ0FEQVNUUkFSX1BFU1NPQSIsIlJPTEVfUEVTUVVJU0FSX0NBVEVHT1JJQSJdLCJqdGkiOiIyMjYyMGY0Zi00MWZkLTRjODItODUyMS02NTdiNmIwODI0ODYiLCJjbGllbnRfaWQiOiJhbmd1bGFyIn0.t-bN3Rbfk_bFsChzjuT5hJb2ZWxdz1YqhZkKIS4tlzs')
    // .set('Content-Type', 'application/json');

    //return this.http.post<Pessoa>(this.pessoaURL, pessoa, {headers})
    return this.http.post<Pessoa>(this.pessoaURL, pessoa)
      .toPromise();
  }

  atualizar(pessoa: Pessoa): Promise<Pessoa> {
    // const headers = new HttpHeaders()
    // .set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJhZG1pbkBybHNwbW9uZXkuY29tIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl0sIm5vbWUiOiJBZG1pbmlzdHJhZG9yIiwiZXhwIjoxNTk4NjI2NjgzLCJhdXRob3JpdGllcyI6WyJST0xFX0NBREFTVFJBUl9DQVRFR09SSUEiLCJST0xFX1BFU1FVSVNBUl9QRVNTT0EiLCJST0xFX1JFTU9WRVJfUEVTU09BIiwiUk9MRV9DQURBU1RSQVJfTEFOQ0FNRU5UTyIsIlJPTEVfUEVTUVVJU0FSX0xBTkNBTUVOVE8iLCJST0xFX1JFTU9WRVJfTEFOQ0FNRU5UTyIsIlJPTEVfQ0FEQVNUUkFSX1BFU1NPQSIsIlJPTEVfUEVTUVVJU0FSX0NBVEVHT1JJQSJdLCJqdGkiOiIyMjYyMGY0Zi00MWZkLTRjODItODUyMS02NTdiNmIwODI0ODYiLCJjbGllbnRfaWQiOiJhbmd1bGFyIn0.t-bN3Rbfk_bFsChzjuT5hJb2ZWxdz1YqhZkKIS4tlzs')
    // .set('Content-Type', 'application/json');

    //return this.http.put<Pessoa>(`${this.pessoaURL}/${pessoa.codigo}`, pessoa, {headers})
    return this.http.put<Pessoa>(`${this.pessoaURL}/${pessoa.codigo}`, pessoa)
      .toPromise()
      .then(response => {
        const pessoaAlterada = response;

        //this.converterStringsParaDatas([pessoaAlterada]);

        return pessoaAlterada;
      });
  }

  buscarPorCodigo(codigo: number): Promise<Pessoa> {
    // const headers = new HttpHeaders()
    // .append('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJhZG1pbkBybHNwbW9uZXkuY29tIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl0sIm5vbWUiOiJBZG1pbmlzdHJhZG9yIiwiZXhwIjoxNTk4NjI2NjgzLCJhdXRob3JpdGllcyI6WyJST0xFX0NBREFTVFJBUl9DQVRFR09SSUEiLCJST0xFX1BFU1FVSVNBUl9QRVNTT0EiLCJST0xFX1JFTU9WRVJfUEVTU09BIiwiUk9MRV9DQURBU1RSQVJfTEFOQ0FNRU5UTyIsIlJPTEVfUEVTUVVJU0FSX0xBTkNBTUVOVE8iLCJST0xFX1JFTU9WRVJfTEFOQ0FNRU5UTyIsIlJPTEVfQ0FEQVNUUkFSX1BFU1NPQSIsIlJPTEVfUEVTUVVJU0FSX0NBVEVHT1JJQSJdLCJqdGkiOiIyMjYyMGY0Zi00MWZkLTRjODItODUyMS02NTdiNmIwODI0ODYiLCJjbGllbnRfaWQiOiJhbmd1bGFyIn0.t-bN3Rbfk_bFsChzjuT5hJb2ZWxdz1YqhZkKIS4tlzs');

    //return this.http.get<Pessoa>(`${this.pessoaURL}/${codigo}`, {headers})
    return this.http.get<Pessoa>(`${this.pessoaURL}/${codigo}`)
      .toPromise()
      .then(response => {
        const pessoa = response;

       // this.converterStringsParaDatas([pessoa]);

        return pessoa;
      });
  }

  listarEstados(): Promise<Estado[]> {
    return this.http.get(this.estadosURL).toPromise()
    .then(response => response as Estado[]);

  }

  pesquisarCidades(estado): Promise<Cidade[]> {
    let params = new HttpParams();
    params = params.set('estado', estado)

    return this.http.get(this.cidadesURL, { params })
        .toPromise()
        .then(response => response as Cidade[]);
   }
}
