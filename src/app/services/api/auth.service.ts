import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from "src/app/services/storage.service";
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  endpoint="";
  endpointSingle=null;
  constructor(protected http: HttpClient,protected storage:StorageService) {

  }
  processGet(path, callback, data=null, fail=null){
    let token =  this.storage.get(environment.coockieName).token;
   
    console.log(token);
    const headers =  {
      headers: new  HttpHeaders({ 
    
        'Authorization': `Bearer ${token}`
      }),
    
    };
    const url:string = `${environment.baseUrl}/${path}`;
    let qs = "";
    if(data != null){
      console.log(data);
      let qs_array = []
      for(let i in data){
        qs_array.push(`${i}=${data[i]}`);
      }
      qs = "?"+qs_array.join("&")

    }
      
    
    const call =  this.http.get(url+qs,headers)
    
    call.subscribe(async data =>{
      let dati:any = data;
      callback(dati);
    },data=>{
      fail!=null?fail(data):callback(null);
    });
  }

  processDelete(path, callback, fail=null){
     let token =  this.storage.get(environment.coockieName).token;

    const headers =  {
      headers: new  HttpHeaders({ 
    
        'Authorization': `Bearer ${token}`
      }),
      

    };
    const url:string = `${environment.baseUrl}/${path}`;

    
    const call =  this.http.delete(url,headers)
    
    call.subscribe(async data =>{
      console.log("dataaaa",data);
      let dati:any = data;
      callback(dati);
    },data=>{
      fail!=null?fail(data):callback(null);
    });
  }
  processPost(path, data, callback,fail=null){
    let token =  this.storage.get(environment.coockieName).token;
   //let token = null;
    console.log(token);
    const headers =  {
      headers: new  HttpHeaders({ 
    
        'Authorization': `Bearer ${token}`
      }),
      


    };
    const url:string = `${environment.baseUrl}/${path}`;
    console.log(url);
    
    const call =  this.http.post(url, data,headers)
    
    call.subscribe(async data =>{
      console.log(data);
      let dati:any = data;
      callback(dati);
    },data=>{
      fail!=null?fail(data):callback(null);
      //document.location.href = '/';
      
    });
  }


  processPut(path, data, callback, fail=null){
    let token =  this.storage.get(environment.coockieName).token;
   //let token = null;
    console.log(token);
    const headers =  {
      headers: new  HttpHeaders({ 
    
        'Authorization': `Bearer ${token}`
      }),
      


    };
    const url:string = `${environment.baseUrl}/${path}`;
    console.log(url);
    
    const call =  this.http.put(url, data,headers)
    
    call.subscribe(async data =>{
      console.log(data);
      let dati:any = data;
      callback(dati);
    },data=>{
      fail!=null?fail(data):callback(null);
      
    });
  }


  listAll(callback:(zone: any) => void,data = {}, fail=null){
    this.list(null,null,null,callback, fail)
  }

  list( pageSize,offset,search,callback: (zone: any) => void,data = {},fail=null) {
    if(pageSize != null && pageSize != ""){
      data['pageSize'] = pageSize;
    }
    if(offset != null && offset != ""){
      data['offset'] = offset;
    }
    if(search != null && search != ""){
      data['search'] = search;
    } 
    
    return this.processGet(`${this.endpoint}`, callback, data ,fail);
  }
  

  item(key,keyName,callback: (data: any) => void,fail=null){
    return this.processGet(`${this.endpointSingle?this.endpointSingle:this.endpoint}?${keyName}=${key}`, callback, fail);
  }


  add(data, callback: (data: any) => void,fail=null){
    return this.processPost(`${this.endpoint}`, data, callback,fail);
  }


  update(data, callback: (data: any) => void,fail=null){
    return this.processPut(`${this.endpointSingle?this.endpointSingle:this.endpoint}`, data, callback, fail);
  }

  

  delete(key,keyName,callback: (data: any) => void,fail=null){
    return this.processDelete(`${this.endpointSingle?this.endpointSingle:this.endpoint}?${keyName}=${key}`, callback, fail);
  }
}
