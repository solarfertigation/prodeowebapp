import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(protected http: HttpClient) {

  }

  login(username: string, password:string, callback) {
    const url = environment.baseUrl+"/auth";
    const data = {
      username,
      password,
    }
    const call =  this.http.post(url, data)
    
    call.subscribe(async data =>{
      let dati:any = data;
      callback(true, dati);
    },data=>{
      callback(false,null)
    });
  }
}
