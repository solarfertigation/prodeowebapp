import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from "src/app/services/api/auth/users.service";
import { DevicesService } from "src/app/services/api/auth/devices.service";
import { User } from 'src/app/data/user';
import { ModalDirective } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-gestione-utenti',
  templateUrl: './gestione-utenti.component.html',
  styleUrls: ['./gestione-utenti.component.scss']
})
export class GestioneUtentiComponent implements OnInit {
  section: string;
  loaded: boolean;
  
  users: any;
  devices: any;
  utente: User;
  roles=[
    {label:"Master",role:"admin"},
    {label:"Slave",role:"user"},
  ]
  errors: { username: string; name: string; lastname: string; password: string; confirmPassword: string; };
  userNameToDelete: any;
  @ViewChild('deleteUser') public deleteUser: ModalDirective;
  constructor(private router: Router, private actRoute: ActivatedRoute, private uService: UsersService, private dService: DevicesService) {
    this.utente = new User(uService);
  }
  
  ngOnInit(): void {
    const url = this.actRoute.snapshot.url;
    if (url[1] != undefined && url[1].path == 'edit') {
      this.section = 'modifica';
      this.loaded = false;
      this.utente.createByUsername(this.actRoute.snapshot.params.username,()=>{
        this.dService.listAll((devices) => {
          this.devices = devices.devices;
          this.loaded = true;
        });

      })
    } else if (url[1] != undefined && url[1].path == 'add') {
      this.section = 'nuovo';
      this.loaded = false;
      this.utente.empty();
      this.dService.listAll((devices) => {
        this.devices = devices.devices;
        this.loaded = true;
      });
      
    } else {
      this.section = 'list';
      this.loaded = false;
      this.users = [];
      this.uService.listAll((users) => {
        this.loaded = true;
        this.users = users.success ? users.users : [];
      });
    }
  }

  userNameText(role) {
    return role == "admin" ? "Master" : "Slave";
  }

  salva(){
    const validate = this.utente.validate();
    
    if(!validate.success){
      this.errors = validate.errors;
    }else{
       this.utente.save((ret,type)=>{
         if(ret.success){
          this.router.navigate(['/admin/gestioneutenti'],{state:{message:`Utente ${type=="add"?"aggiunto":"modificato"} correttamente`,"title":"Operazione completata"}})
         }else{
          this.errors = ret.errors;
         }
        
      });
      
    }
  }


  elimina(username){
    this.userNameToDelete = username;
    this.deleteUser.show();
  }

  confirmElimina(){
    this.uService.delete(this.userNameToDelete,'username', () => {
      this.reloadData();
      this.deleteUser.hide();
    });
  }

  reloadData(){
    this.uService.listAll((users) => {
      this.loaded = true;
      this.users = users.success ? users.users : [];
    });
  }

}
