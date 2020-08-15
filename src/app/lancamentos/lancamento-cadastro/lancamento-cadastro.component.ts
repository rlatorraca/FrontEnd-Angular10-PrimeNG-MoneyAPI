import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';



import { PessoaService } from './../../pessoas/pessoa.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { CategoriaService } from './../../categorias/categoria.service';
import { Lancamento } from './../../core/model'
import { LancamentoService } from '../lancamento.service';

import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  dataVencimento : Date;
  en: any;
  ptbr: any;
  categorias = [];
  pessoas = [];
  //lancamento = new Lancamento;
  formulario : FormGroup;
  uploadEmAndamento = false;

  tipos = [
    { label: 'Receita', value: 'RECEITA' },
    { label: 'Despesa', value: 'DESPESA' },
  ];


  constructor(
    private categoriaService: CategoriaService,
    private errorHandler: ErrorHandlerService,
    private pessoaService : PessoaService,
    private lancamentoService : LancamentoService,
    private messageService : MessageService,
    private route : ActivatedRoute,
    private router: Router,
    private title : Title,
    private formBuilder : FormBuilder) { }

    //  route : ActivatedRoute  ==> usado para identificar se a ROTA é para CADASTRAR ou se a rota é para EDITAR algum
    //    - isso gracas ao token incluido no const routes : Routes = [ { path: 'lancamentos/:codigo', component: LancamentoCadastroComponent } ]
    //
    // router: Route ==> usado para fazer o redirecionamento para pagina de edição quando for salvo  um lancamento
  ngOnInit(): void {

    this.configurarFormulario();

    const codigoParaEdicao = this.route.snapshot.params['codigo'];
    if (codigoParaEdicao) {
      this.carregarLancamento(codigoParaEdicao);
    }

    this.title.setTitle('Cadastro de Lancamento');

    this.carregarCategorias();
    this.carregarPessoas();

    this.en = {
      firstDayOfWeek: 0,
      dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      dayNamesMin: ["Su","Mo","Tu","We","Th","Fr","Sa"],
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

  configurarFormulario() {
    this.formulario = this.formBuilder.group({
      codigo: [],
      tipo: [ 'RECEITA', Validators.required ],
      dataVencimento: [ null, Validators.required ],
      dataPagamento: [],
      descricao: [null, [ this.validarObrigatoriedade, this.validarTamanhoMinimo(5) ]],
      valor: [ null, Validators.required ],
      pessoa: this.formBuilder.group({
        codigo: [ null, Validators.required ],
        nome: []
        //ativo:[]
      }),
      categoria: this.formBuilder.group({
        codigo: [ null, Validators.required ],
        nome: []
      }),
      observacao: [],
      //anexo: [],
      //urlAnexo: []
    });
    console.log (this.formulario);
  }

  validarObrigatoriedade(input: FormControl) {

    return (input.value ? null : { obrigatoriedade: true });
  }

  validarTamanhoMinimo(valor: number) {
    return (input: FormControl) => {
      return (!input.value || input.value.length >= valor) ? null : { tamanhoMinimo: { tamanho: valor } };
    };
  }

  antesUploadAnexo(event) {
    event.xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'));

    this.uploadEmAndamento = true;
  }



  get urlUploadAnexo() {
    return this.lancamentoService.urlUploadAnexo();
  }

  get editando() {
    //return Boolean(this.lancamento.codigo);
    return Boolean(this.formulario.get('codigo').value);
  }

  //carrega o lancamento pra ser alterado (metodo put)
  carregarLancamento(codigo : number) {

    this.lancamentoService.buscarPorCodigo(codigo)
      .then(lancamento => {
        //this.lancamento = lancamento;
        this.formulario.patchValue(lancamento);
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  salvar() {
    if (this.editando) {
      this.atualizarLancamento();
    } else {
      this.adicionarLancamento();
    }
  }

  adicionarLancamento() {

    this.lancamentoService.adicionar(this.formulario.value)
      .then( lancamentoAdicionado => {
        this.messageService.add({severity:'success', summary:'Inclusão de Lançamento ', detail:"Lançamento com a descricao : "+ this.formulario.get('descricao').value + " foi INCLUÍDO com sucesso"});
        //this.toasty.success('Lançamento adicionado com sucesso!');

        //form.reset();
        //this.lancamento = new Lancamento();
        this.router.navigate(['/lancamentos', lancamentoAdicionado.codigo]);

      })
      .catch(erro => this.errorHandler.handle(erro));


    // if (this.editando) {
    //   this.atualizarLancamento();
    // } else {
    //   this.adicionarLancamento();
    // }
  }

  atualizarLancamento() {

    this.lancamentoService.atualizar(this.formulario.value)
      .then( lancamento => {
        this.messageService.add({severity:'success', summary:'Atualização de Lançamento ', detail:"Lançamento com descricao :  "+ this.formulario.get('descricao').value + " foi ATUALIZADO com sucesso"});
        //this.toasty.success('Lançamento adicionado com sucesso!');
        //this.lancamento = lancamento;
        this.formulario.patchValue(lancamento);
        this.atualizarTituloEdicao();

      })
      .catch(erro => this.errorHandler.handle(erro));


    // if (this.editando) {
    //   this.atualizarLancamento();
    // } else {
    //   this.adicionarLancamento();
    // }
  }

  carregarCategorias() {
    return this.categoriaService.listarTodas()
      .then(categoria => {
        this.categorias = categoria
          .map(c => ({ label: c.nome, value: c.codigo }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarPessoas() {
    this.pessoaService.listarTodas()
      .then(pessoa => {
        this.pessoas = pessoa
          .map(p => ({ label: p.nome, value: p.codigo }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }


  novo() {
    this.formulario.reset();

    setTimeout(function() {
      this.lancamento = new Lancamento();
    }.bind(this), 1);

    this.router.navigate(['/lancamentos/novo']);
  }

  atualizarTituloEdicao(){
    this.title.setTitle('Edicao de Lancamento : ' + this.formulario.get('descricao').value);
  }
}
