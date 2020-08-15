import { Component, OnInit } from '@angular/core';
import { Pessoa } from 'src/app/core/model';
import { CategoriaService } from 'src/app/categorias/categoria.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { PessoaService } from '../pessoa.service';
import { MessageService } from 'primeng/api';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Route, ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  pessoa = new Pessoa();
  exbindoFormularioContato = false;
  
  constructor(
    
    private errorHandler: ErrorHandlerService,
    private pessoaService : PessoaService,    
    private messageService : MessageService,
    private title : Title,
    private router : Router,
    private route : ActivatedRoute
  ) { }

  ngOnInit(): void {
    const codigoPessoa = this.route.snapshot.params['codigo'];

    this.title.setTitle('Nova pessoa');

    if (codigoPessoa) {
      this.carregarPessoa(codigoPessoa);
    }
  }

  

  prepararNovoContato() {
    this.exbindoFormularioContato = true;
  }

  get editando() {
    return Boolean(this.pessoa.codigo)
  }

  carregarPessoa(codigo: number) {
    this.pessoaService.buscarPorCodigo(codigo)
      .then(pessoa => {
        this.pessoa = pessoa;
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  salvar(form: NgForm) {
    if (this.editando) {
      this.atualizarPessoa(form);
    } else {
      this.adicionarPessoa(form);
    }
  }

  adicionarPessoa(form: NgForm) {
    this.pessoaService.adicionar(this.pessoa)
      .then(pessoaAdicionada => {
        this.messageService.add({severity:'success', summary:'Inclusão de Pessoa ', detail:"Cadastro de pessoa de código "+ this.pessoa.nome + " foi ADICIONADO com sucesso"});
        
        this.router.navigate(['/pessoas', pessoaAdicionada.codigo]);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarPessoa(form: NgForm) {
    this.pessoaService.atualizar(this.pessoa)
      .then(pessoa => {
        this.pessoa = pessoa;

        this.messageService.add({severity:'success', summary:'Alteração de Pessoa ', detail:" "+ this.pessoa.nome + " foi ALTERADO com sucesso"});
        
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  nova(form: NgForm) {
    form.reset();

    setTimeout(function() {
      this.pessoa = new Pessoa();
    }.bind(this), 1);

    this.router.navigate(['/pessoas/nova']);
  }

  
  atualizarTituloEdicao(){
    this.title.setTitle('Edicao de Pessoa : ' + this.pessoa.nome);
  }
  

}
