import { StatsComponent } from './stats/stats.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GestioneUtentiComponent } from './gestione-utenti/gestione-utenti.component';
import { MappeComponent } from './mappe/mappe.component';
import { StorageService } from '../../services/storage.service'
import { environment } from '../../../environments/environment';
const sService = new StorageService();
const auth = sService.get(environment.coockieName);
let routes = null;
if (auth != null && auth.role == "admin") {
routes = [
  {
    path: 'gestioneutenti',
    component: GestioneUtentiComponent,
    data: {
      title: 'Lista utenti'
    },
  }, {
    path: 'gestioneutenti/add',
    component: GestioneUtentiComponent,
    data: {
      title: 'Nuovo utente'
    }
  }

  , {
    path: 'gestioneutenti/edit/:username',
    component: GestioneUtentiComponent,
    data: {
      title: 'Modifica utente'
    }
  }, 
  {
    path: 'mappe',
    component: MappeComponent,
    data: {
      title: 'Mappe'
    }
  }, {
    path: 'dashboard',
    component: StatsComponent,
    data: {
      title: 'Statistiche'
    }
  }

]
} else if (auth != null && auth.role == "user") {
  routes = [
    
   
    {
      path: 'mappe',
      component: MappeComponent,
      data: {
        title: 'Mappe'
      }
    }, {
      path: 'dashboard',
      component: StatsComponent,
      data: {
        title: 'Statistiche'
      }
    }
  
  ]
}
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class AdminRoutingModule { }
  