import { INavData } from '@coreui/angular';
import { StorageService } from './services/storage.service'
import { environment } from '../environments/environment';
const sService = new StorageService();
const auth = sService.get(environment.coockieName);

let items = [];
if (auth != null && auth.role == "admin") {
  items = [
    {
      name: 'Dashboard',
      url: '/admin/dashboard',
      icon: 'cil-speedometer'

    },
    {
      name: 'Gestione utenti',
      url: '/admin/gestioneutenti',
      icon: 'cil-group'

    }
    ,
    {
      name: 'Mappe',
      url: '/admin/mappe',
      icon: 'cil-map'

    }
  ];
} else if (auth != null && auth.role == "user") {
  items = [
    {
      name: 'Dashboard',
      url: '/admin/dashboard',
      icon: 'cil-speedometer'

    }
    ,
    {
      name: 'Mappe',
      url: '/admin/mappe',
      icon: 'cil-map'

    }
  ];
}


export const navItems: INavData[] = items;