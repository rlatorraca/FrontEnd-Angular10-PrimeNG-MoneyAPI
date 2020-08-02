import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { ErrorHandlerService} from './error-handler.service'
import { LancamentoService } from './../lancamentos/lancamento.service';
import { PessoaService } from './../pessoas/pessoa.service';

import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ToastModule} from 'primeng/toast';
import {MessageService} from 'primeng/api';

import {ConfirmationService} from 'primeng/api'
import { RouterModule } from '@angular/router';
@NgModule({
  declarations: [ NavbarComponent ],
  
  imports: [ 
    CommonModule,

    RouterModule,

    ConfirmDialogModule,
    ToastModule,    ],
  exports: [ NavbarComponent, ToastModule, ConfirmDialogModule ],
  providers: [ LancamentoService, PessoaService, ErrorHandlerService,  MessageService, ConfirmationService]
})
export class CoreModule { }
