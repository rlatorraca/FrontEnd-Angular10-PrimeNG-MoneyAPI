import { Component, OnInit  , ViewChild} from '@angular/core'; 
import { LancamentoService, LancamentoFilter } from './../lancamento.service';
import { LazyLoadEvent } from 'primeng/api/public_api';
import { MessageService } from 'primeng/api'; 
import {ConfirmationService} from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';



@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css'] 
})
export class LancamentosPesquisaComponent implements OnInit {
  
  lancamentos = [];
  filtro = new LancamentoFilter();
  totalRegistros =0;
  descricao : string;
  en : any;
  ptbr : any;
  @ViewChild('tabelaLancamento', {static: true}) grid: any; // @ViewChild : procura a "#tabelaLancamento" dentro do html (lancamentos-pesquisa.componente.html), tendo acesso ao objeto de TABELA

  constructor(
      private lancamentoService: LancamentoService, 
      private messageService: MessageService,
      private confirmation : ConfirmationService,
      private errorHandler : ErrorHandlerService) 
  { }

  ngOnInit() {
    //this.pesquisar();
    this.en = {
      firstDayOfWeek: 0,
      dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      dayNamesMin: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      //dayNamesMin: ["Su","Mo","Tu","We","Th","Fr","Sa"],
      monthNames: [ "January","February","March","April","May","June","July","August","September","October","November","December" ],
      monthNamesShort: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ],
      today: 'Today',
      clear: 'Clear',
      dateFormat: 'mm/dd/yy',
       weekHeader: 'Wk'
    };
    
    this.ptbr = {
      firstDayOfWeek: 0,
      dayNames: ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta--feira", "Sexta--feira", "Sábado"],
      dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"],
      dayNamesMin: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"],
      //dayNamesMin-Bkp: ["Do","Sg","Te","Qa","Qi","Sx","Sa"],
      monthNames: [ "Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro" ],
      monthNamesShort: [ "Jan", "Fev", "Mar", "Abr", "Mai", "Jun","Jul", "Ago", "Set", "Out", "Nov", "Dez" ],
      today: 'Hoje',
      clear: 'Limpar',
      dateFormat: 'dd/mm/yy',
      weekHeader: 'Sem'
    };
  }

  pesquisar( pagina = 0) {
    
    this.filtro.pagina = pagina;
    this.lancamentoService.pesquisar( this.filtro )
      .then(resultado => {
        this.totalRegistros = resultado.total; // recebe o total de registros existentes
        this.lancamentos = resultado.lancamentos; // recebe todos os elementos da pesquisa
      })
      .catch(erro => this.errorHandler.handle(erro));
      
  }


  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows; // Calcula em qual pagina será feita a pesquisa
    this.pesquisar(pagina);
  }

  confirmarExclusao(lancamento: any) {

    this.confirmation.confirm({
      message: "Tem certeza que deseja excluir ?",
      accept : () =>{
        this.excluir(lancamento);        
      }
    });
    
  }

  excluir(lancamento : any) {

    this.lancamentoService.excluir(lancamento.codigo)
      .then(() => {
        if (this.grid.first === 0) {
          this.pesquisar();
        } else {
          this.grid.reset(); // exibir a partir do registo zero
        }
  
        this.messageService.add({severity:'success', summary:'Lançamento', detail:"Lançamento de código "+ lancamento.codigo + " foi excluído com sucesso"});
        //this.toastyService.success("Lançamento  ${lancamento.pessoa} excluído com sucesso !");
        //this.toastyService.info("Obrigado pela preferência!");
      }) 
      .catch(erro => this.errorHandler.handle(erro));
  }
  
}
