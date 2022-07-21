import { CurrentUserService } from './../../services/api/auth/current-user.service';
import { Component } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { LoginService } from "src/app/services/api/login.service";
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent { 
  username:string = "";
  error:string = "";
  password:string = "";
  constructor(private storage:StorageService, private apilogin: LoginService, private cuService: CurrentUserService ){

  }


  login(){
    this.apilogin.login(this.username, this.password, (success,user)=>{
      console.log(user.success);
      
      if(!user.success){
        this.error = "Attenzione: username o password errati";
      }else{
        this.storage.set(environment.coockieName, user);
        this.cuService.getUser((dati_utente)=>{
          user.dati_utente = dati_utente;

          this.storage.deleteCookie(environment.coockieName);
          this.storage.set(environment.coockieName, user);
          document.location.href = '/';
        });
       
      }
      

    }) 

  }

}
