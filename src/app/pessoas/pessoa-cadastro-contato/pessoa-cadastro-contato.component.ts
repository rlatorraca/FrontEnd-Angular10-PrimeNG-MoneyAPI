import { NgForm } from '@angular/forms';
import { Contato } from './../../core/model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pessoa-cadastro-contato',
  templateUrl: './pessoa-cadastro-contato.component.html',
  styleUrls: ['./pessoa-cadastro-contato.component.css']
})
export class PessoaCadastroContatoComponent implements OnInit {


  @Input() contatos : Array<Contato>;
  exibindoFormularioContato = false;
  contato: Contato;
  contatoIndex : number ; // usado para fazer a Edicao do Contato

  constructor() { }

  ngOnInit(): void {
  }

  //usado para criar um nova instancia de contato ao acrescentar varios contatos ao mesmo tempo e um nao interferir no outro apos o reset do formulario
  novaInstanciaContato(contato : Contato) : Contato{
    return new Contato(contato.codigo, contato.nome, contato.email, contato.telefone);
  }

  prepararEdicaoContato(contato : Contato ,index : number){
    this.contato = this.novaInstanciaContato(contato);
    this.exibindoFormularioContato = true;
    this.contatoIndex = index;
  }

  prepararNovoContato() {
    this.exibindoFormularioContato = true;
    this.contato = new Contato();
    this.contatoIndex = this.contatos.length;
  }

  confirmarContato(frm : NgForm){
    this.contatos[this.contatoIndex] = this.novaInstanciaContato(this.contato);
    //this.pessoa.contatos.push(this.novaInstanciaContato(this.contato));
    this.exibindoFormularioContato = false;
    frm.reset();
  }

  removerContato(rowIndex : number){
    this.contatos.splice(rowIndex, 1); // rowIndex : o indice da posicao de exclusao, 1 : quantidade de elementos a ser excluida
  }

  get editando(){
    return this.contato && this.contato.codigo; // retorna TRUE se existir CONTATO e este CONTATO tiver um codigo, assim, estaremo EDITANDO
  }
}
