import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LancamentosPesquisaComponent } from './lancamentos-pesquisa/lancamentos-pesquisa.component';
import { LancamentoCadastroComponent } from './lancamento-cadastro/lancamento-cadastro.component';

// import { LancamentoCadastroComponentOrientadoATemplate } from './lancamento-cadastro/lancamento-cadastro.component-OrientadoATemplate';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';

import { LancamentosRoutingModule } from './lancamentos-routing.module';
// PrimeNG Modules
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {TooltipModule} from 'primeng/tooltip';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {CalendarModule} from 'primeng/calendar';
import {TabViewModule} from 'primeng/tabview';
import {SelectButtonModule} from 'primeng/selectbutton';
import { DropdownModule } from 'primeng/dropdown';
import {InputMaskModule} from 'primeng/inputmask';
import {ToastModule} from 'primeng/toast';
import { FileUploadModule} from 'primeng/fileupload'


//Currency Mask
import {CurrencyMaskModule} from 'ng2-currency-mask'
import { SharedModule } from './../shared/shared.module';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    LancamentoCadastroComponent,
    LancamentosPesquisaComponent

   // LancamentoCadastroComponentOrientadoATemplate

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    SharedModule,
    ButtonModule,
    InputTextModule,
    TableModule,
    TooltipModule,
    InputTextareaModule,
    CalendarModule,
    TabViewModule,
    SelectButtonModule,
    DropdownModule,
    InputMaskModule,
    FileUploadModule,

    CurrencyMaskModule,
    ToastModule,

    LancamentosRoutingModule
  ],
  exports : [ ]
})
export class LancamentosModule { }
