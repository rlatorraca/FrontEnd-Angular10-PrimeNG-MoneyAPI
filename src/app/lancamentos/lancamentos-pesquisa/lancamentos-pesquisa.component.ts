import { Component, OnInit } from '@angular/core'; 
import { LancamentoService, LancamentoFilter } from './../lancamento.service';
import { LazyLoadEvent } from 'primeng/api/public_api';
@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent{
  
  lancamentos = [];
  filtro = new LancamentoFilter();
  totalRegistros =0;
  descricao : string;
  en : any;
  ptbr : any;

  constructor(private lancamentoService: LancamentoService) { }

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
      });
      
  }


  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows; // Calcula em qual pagina será feita a pesquisa
    this.pesquisar(pagina);
  }
  
}
