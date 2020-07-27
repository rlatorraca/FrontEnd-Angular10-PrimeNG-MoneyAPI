import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms'

@Component({
  selector: 'app-message',
  template: `
      <div *ngIf="temErro()" class="ui-messages ui-messages-error">
          {{ texto }}
      </div>
  `,
  styles: [`
        .ui-messages-error {
            margin : 0;
            margin-top : 5px;
        }
    `]
})
export class MessageComponent {

  @Input() controle : FormControl // @Input() : vai ser injetado no componente
  @Input() erro : string;
  @Input() texto : string;

  temErro() :boolean {
    return this.controle.hasError(this.erro) && this.controle.dirty;
  }
}


