import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { MoneyHttp } from './money-http';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  tokenRevokeURL : string;

  constructor(private http : HttpClient, private auth : AuthService) { 
     this.tokenRevokeURL = `${environment.apiURL}/tokens/revoke`;
  }

  logout(){
    return this.http.delete(this.tokenRevokeURL, { withCredentials : true})
      .toPromise()
      .then(() => {
        this.auth.limparAccessToken();
      });
  }
}
