import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';



import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { LancamentosModule } from './lancamentos/lancamentos.module';
import { PessoasModule } from './pessoas/pessoas.module';
import { LancamentoService } from './lancamentos/lancamento.service';
import { PessoaService } from './pessoas/pessoa.service';
import {ToastModule} from 'primeng/toast';



import {MessageService} from 'primeng/api';

@NgModule({
  declarations: [
    AppComponent,    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LancamentosModule,
    ToastModule,    
    PessoasModule,
    CoreModule,    
    HttpClientModule
  ],
  providers: [LancamentoService, PessoaService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
