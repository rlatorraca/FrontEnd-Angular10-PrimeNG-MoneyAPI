import { Component, OnInit } from '@angular/core';
import { Pessoa } from 'src/app/core/model';
import { CategoriaService } from 'src/app/categorias/categoria.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { PessoaService } from '../pessoa.service';
import { MessageService } from 'primeng/api';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  pessoa = new Pessoa();
  
  constructor(
    private categoriaService: CategoriaService,
    private errorHandler: ErrorHandlerService,
    private pessoaService : PessoaService,    
    private messageService : MessageService,
    private title : Title
  ) { }

  ngOnInit(): void {
  }

  salvar(form: NgForm) {
    this.pessoaService.adicionar(this.pessoa)
      .then(() => {
        this.messageService.add({severity:'success', summary:'Inclusão de Lançamento ', detail:""+ this.pessoa.nome + " foi adicionado com sucesso"});        

        form.reset();
        this.pessoa = new Pessoa();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }
  
  atualizarTituloEdicao(){
    this.title.setTitle('Edicao de Lancamento : ' + this.pessoa.nome);
  }
  

}
