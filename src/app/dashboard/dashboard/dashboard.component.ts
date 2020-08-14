import { Component, OnInit } from '@angular/core';
import { DashboardService } from './../dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})


export class DashboardComponent implements OnInit {


  pieChartData: any;
  lineChartData: any;
 
  
  constructor(private dashboardService : DashboardService) { 

   
    
  }

  ngOnInit(): void {
    this.configurarGraficoDePizza();
    this.configurarGraficoDeLinha();
  }

  configurarGraficoDeLinha() {
    this.dashboardService.lancamentosPorDia()
      .then(dados => {
        const todosDiasDoMes = this.configurarDiasDoMes();
        const totalReceitas = this.dadosTotaisPorCadaDiaDoMes(dados.filter(dado => dado.tipo === 'RECEITA'), todosDiasDoMes);
        const totalDespesas = this.dadosTotaisPorCadaDiaDoMes(dados.filter(dado => dado.tipo === 'DESPESA'), todosDiasDoMes);       
        

        this.lineChartData = {
          labels: todosDiasDoMes,
          datasets: [
            {
              label: 'Receitas',
              data: totalReceitas,
              totalDespesas: ["#3366CC"]
            }, {
              label: 'Despesas',
              data: totalDespesas,
              borderColor: ["#FF9900"]
            }
          ]
        }
      });
   
  }

  private dadosTotaisPorCadaDiaDoMes(dados, totalDiasDoMes) {

    const totaisPorDiaFinal : number[] = [];

    for (const dia of totalDiasDoMes) {

      let valorTotalDoDia=0;

      for (const dado of dados){
        if(dado.dia.getDate() === dia) { // Se existe dados diferentes de ZERO no dia pega o valor
          valorTotalDoDia = dado.total;
            break; // se achou o dia sai
        }
      }

      totaisPorDiaFinal.push(valorTotalDoDia);
    }

    return totaisPorDiaFinal;
  }

  private configurarDiasDoMes(){
    const mesReferencia = new Date();

    mesReferencia.setMonth(mesReferencia.getMonth() + 1); // Faz um shift para o mes seguinte.
    mesReferencia.setDate(0); // como esta no mes posterior (proximo), setando para ZERO, vc retorna para o ultima do mes anterior (o de interesse)

    const quantidadeDeDiasMes = mesReferencia.getDate(); // Pega o ultimo dia do mes, logo pega a quantidade de dias do mes que queremos plotar no grafico

    const totalDias : number[] = [];
    for(let i = 1; i <= quantidadeDeDiasMes; i++){
      totalDias.push(i)
    }

    return totalDias;

  }

  configurarGraficoDePizza() {
   this.dashboardService.lancamentosPorCategoria()
      .then(dados => {
        this.pieChartData = {
          labels: dados.map(dado => dado.categoria.nome), // Transforma o ARRAY que chega (Objeto)) em  STRING
          datasets: [
            {
              data:  dados.map(dado => dado.total), // Transforma o ARRAY que chega (Objeto)) em  NUMERO
              backgroundColor: ['#FF9900', '#109618', '#990099', '#3B3EAC', '#0099C6', '#DD4477', '#3366CC', '#DC3912']
            }
          ]
        };
      })

  }
}