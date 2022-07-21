import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  public getCookie(name: string) {
    let ca: Array<string> = document.cookie.split(';');
    let caLen: number = ca.length;
    let cookieName = `${name}=`;
    let c: string;

    for (let i: number = 0; i < caLen; i += 1) {
        c = ca[i].replace(/^\s+/g, '');
        if (c.indexOf(cookieName) == 0) {
            return c.substring(cookieName.length, c.length);
        }
    }
    return '';
  }

  public get(name){
    const data = this.getCookie(name);
    if(data){
      return JSON.parse(data);
    }
    return false;
  

  }
  public set(name, data){
   

    let dataStr = JSON.stringify(data);
    
    this.setSessionCookie(name,dataStr);
  }

  public deleteCookie(name) {
    this.setCookie(name, '', -1);
  }
  
  public setCookie(name: string, value: string, expireDays: number, path: string = '') {
      let d:Date = new Date();
      d.setTime(d.getTime() + expireDays * 24 * 60 * 60 * 1000);
      let expires:string = `expires=${d.toUTCString()}`;
      let cpath:string = path ? `; path=${path}` : '';
      document.cookie = `${name}=${value}; ${expires}${cpath}`;
  }

  public setSessionCookie(name: string, value: string, expireMin: number = 480, path: string = '') {
    let d:Date = new Date();
    d.setTime(d.getTime() + expireMin * 60 * 1000);
    let expires:string = `expires=${d.toUTCString()}`;
    let cpath:string = path ? `; path=${path}` : '';
    document.cookie = `${name}=${value}; ${expires}${cpath}`;
}

}
