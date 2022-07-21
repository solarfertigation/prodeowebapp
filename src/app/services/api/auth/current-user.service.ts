import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service'
@Injectable({
  providedIn: 'root'
})
export class CurrentUserService extends AuthService {

  getUser(callback: (user: any) => void) {
    return this.processGet(`user/current`, callback);
  }

}
