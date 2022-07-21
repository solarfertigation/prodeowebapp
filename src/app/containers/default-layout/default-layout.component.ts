import {Component} from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { navItems } from '../../_nav';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss']
})
export class DefaultLayoutComponent {ng
  dati_utente: any;
  constructor(protected storage:StorageService ,private router: Router)
  {
    this.dati_utente = storage.get(environment.coockieName).dati_utente.user;
  }
  public sidebarMinimized = false;
  public navItems = navItems;

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  logout(){
    this.storage.deleteCookie(environment.coockieName);
    location.href="/";
  }

}
