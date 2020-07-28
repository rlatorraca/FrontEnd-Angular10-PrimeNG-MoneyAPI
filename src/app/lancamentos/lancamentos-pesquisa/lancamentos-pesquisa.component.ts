import { Component, OnInit } from '@angular/core'; 
import { LancamentoService } from './../lancamento.service';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent{
  
  lancamentos = [];
  descricao : string;

  constructor(private lancamentoService: LancamentoService) { }

  ngOnInit() {
    this.pesquisar();
  }

  pesquisar() {
    console.log("Descricao : " + this.descricao);
    this.lancamentoService.pesquisar( { descricao : this.descricao })
      .then(lancamentos => this.lancamentos = lancamentos);
      
  }

}
