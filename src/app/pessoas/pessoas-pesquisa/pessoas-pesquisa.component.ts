import { Component, OnInit } from '@angular/core';

import { PessoaFilter, PessoaService} from '../pessoa.service';
import { LazyLoadEvent} from 'primeng/api/primeng-api'
@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent {

  pessoas = [];
  totalRegistros = 0;
  filtro = new PessoaFilter();


  constructor(private pessoaService: PessoaService) { }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.pessoaService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.pessoas = resultado.pessoas;
      });
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

   

}
