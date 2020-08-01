import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  categoriasURL = 'http://localhost:8080/categorias';

  constructor(private http : HttpClient) { }

  listarTodas(): Promise<any> {
    const headers = new HttpHeaders().set('Authorization', 
    'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJhZG1pbkBybHNwbW9uZXkuY29tIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl0sIm5vbWUiOiJBZG1pbmlzdHJhZG9yIiwiZXhwIjoxNTk4NjI2NjgzLCJhdXRob3JpdGllcyI6WyJST0xFX0NBREFTVFJBUl9DQVRFR09SSUEiLCJST0xFX1BFU1FVSVNBUl9QRVNTT0EiLCJST0xFX1JFTU9WRVJfUEVTU09BIiwiUk9MRV9DQURBU1RSQVJfTEFOQ0FNRU5UTyIsIlJPTEVfUEVTUVVJU0FSX0xBTkNBTUVOVE8iLCJST0xFX1JFTU9WRVJfTEFOQ0FNRU5UTyIsIlJPTEVfQ0FEQVNUUkFSX1BFU1NPQSIsIlJPTEVfUEVTUVVJU0FSX0NBVEVHT1JJQSJdLCJqdGkiOiIyMjYyMGY0Zi00MWZkLTRjODItODUyMS02NTdiNmIwODI0ODYiLCJjbGllbnRfaWQiOiJhbmd1bGFyIn0.t-bN3Rbfk_bFsChzjuT5hJb2ZWxdz1YqhZkKIS4tlzs');

    return this.http.get(this.categoriasURL, { headers })
      .toPromise()
      .then(() => null);
  }
}
