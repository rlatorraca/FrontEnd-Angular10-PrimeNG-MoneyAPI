import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaginaNaoEncontradaComponent } from './core/pagina-nao-encontrada.component';
import { PessoasPesquisaComponent } from './pessoas/pessoas-pesquisa/pessoas-pesquisa.component';
import { PessoaCadastroComponent } from './pessoas/pessoa-cadastro/pessoa-cadastro.component';


const routes: Routes = [
  { path: '', redirectTo: 'lancamentos', pathMatch: 'full' },
  { path: 'pagina-nao-encontrada', component: PaginaNaoEncontradaComponent },
  { path: 'pessoas', component: PessoasPesquisaComponent },
  { path: 'pessoas/novo', component: PessoaCadastroComponent },
  { path: '**', redirectTo: 'pagina-nao-encontrada' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }