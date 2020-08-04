import { Component } from '@angular/core';
import {MessageService} from 'primeng/api';
import { Router } from '@angular/router';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'rlspmoney-ui';

  constructor(
    private mensageService : MessageService, 
    private router : Router) {}

  exibindoNavbar() {
    return this.router.url !== '/login';
  }

}
