import { Component, OnInit, ViewChild } from '@angular/core';

import { PessoaFilter, PessoaService} from '../pessoa.service';
import { LazyLoadEvent} from 'primeng/api/primeng-api';
import { MessageService, ConfirmationService} from 'primeng/api'
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent implements OnInit{

  pessoas = [];
  totalRegistros = 0;
  filtro = new PessoaFilter();
  @ViewChild('tabelaPessoas', {static: true}) grid: any; // @ViewChild : procura a "#tabelaPessoas" dentro do html (lancamentos-pesquisa.componente.html), tendo acesso ao objeto de TABELA


  constructor(
    private pessoaService: PessoaService, 
    private messageService : MessageService,
    private confirmation : ConfirmationService,
    private errorHandler : ErrorHandlerService,
    private title : Title) { }

    ngOnInit() {
      //this.pesquisar();
      this.title.setTitle('Pesquisa de Pessoas');
    }

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

  confirmarExclusao(pessoa: any) {

    this.confirmation.confirm({
      message: "Tem certeza que deseja excluir "+ pessoa.nome +" ?",
      accept : () =>{
        this.excluir(pessoa);        
      }
    });
    
  }

  excluir(pessoa : any) {

    this.pessoaService.excluir(pessoa.codigo)
      .then(() => {
        if (this.grid.first === 0) {
          this.pesquisar();
        } else {
          this.grid.reset(); // exibir a partir do registo zero
        }
  
        this.messageService.add({severity:'success', summary:'Pessoas', detail:"A pessoa de nome '"+ pessoa.nome + "' foi excluído com sucesso"});
        //this.toastyService.success("Lançamento  ${lancamento.pessoa} excluído com sucesso !");
        //this.toastyService.info("Obrigado pela preferência!");
      }) 
      .catch(erro => this.errorHandler.handle(erro));
  }

  alternarStatus(pessoa : any){
    const novoStatusPessoa = ! pessoa.ativo;
    
    this.pessoaService.mudarStatus(pessoa.codigo, novoStatusPessoa)
      .then(() => {
        const acao = novoStatusPessoa ? 'ativada' : 'desativada';
        pessoa.ativo = novoStatusPessoa
        this.messageService.add({severity:'success', summary:'Ativar/Desativar', detail:"A pessoa de nome '"+ pessoa.nome + "' foi '"+ acao +"' com sucesso"});

      })
      .catch(erro => this.errorHandler.handle(erro));
    
  }
 

}
