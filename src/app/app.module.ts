import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { HttpClientModule } from '@angular/common/http';



import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { LancamentosModule } from './lancamentos/lancamentos.module';
import { PessoasModule } from './pessoas/pessoas.module';
import { LancamentoService } from './lancamentos/lancamento.service';
import { PessoaService } from './pessoas/pessoa.service';





registerLocaleData(localePt); // Registra a aplicacao como PT-BR
@NgModule({
  declarations: [
    AppComponent,    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LancamentosModule,
    PessoasModule,
    CoreModule,    
    HttpClientModule,
    
    
  ],
  providers: [LancamentoService, PessoaService],
  bootstrap: [AppComponent]
  
})
export class AppModule { }
