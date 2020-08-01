import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(
    private messageService : MessageService
  ) { }

  //Recebe o Objeto Mensagem ou Resposta HTTP
  handle(errorResponse : any) {
    let msg : string; // Mensagem a ser exibida ao usuário

    if(typeof errorResponse === 'string'){
      msg = errorResponse;
    } else if (errorResponse instanceof HttpErrorResponse && errorResponse.status >=400 && errorResponse.status < 500){
      let errors;
      msg = 'Ocorreu um erro ao processar a sua solicitação'
      try{
        errors = errorResponse.error[0];
      } catch (e){     }

      console.error('Ocorreu um erro', errorResponse);
    }else {
      msg = 'Erro ao processar serviço remoto(servidor remoto). Tente novamente';
      console.log('Ocorreu um erro remoto', errorResponse);
    }

    this.messageService.add({severity:'danger', summary:'Erro', detail:msg});
  }
}
