import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service'
import { StorageService } from "src/app/services/storage.service";

@Injectable({
  providedIn: 'root'
})
export class StatsService extends AuthService {

  constructor(protected override http: HttpClient,protected override storage:StorageService) {
    super(http,storage);
    this.endpoint = "stats";
    this.endpointSingle = "stats";
  }


  getDashboards(callback: (user: any) => void) {
    return this.processGet(`stats`, callback);
  }

  updateData(data,uniqueid,callback){
    const body = {
      data,
      uniqueid
    }
    return this.processPut(`stats/data`,body, callback);
  }

  getData(data,callback){
    return this.processPost(`stats/values`, data, callback);
  }

  addDashboards(dashboard_name, callback: (user: any) => void) {
    return this.processPost(`stats/dashboard`, {dashboard_name}, callback);
  }

  rinominaDashboards(uniqueid, dashboard_name, callback: (user: any) => void) {
    return this.processPut(`stats/dashboard?uniqueid=${uniqueid}`, {dashboard_name}, callback);
  }

  getDashboard(uniqueid,callback: (user: any) => void) {
    return this.processGet(`stats/dashboard?uniqueid=${uniqueid}`, callback);
  }

  eliminaDashboard(uniqueid,callback: (user: any) => void) {
    return this.processDelete(`stats/dashboard?uniqueid=${uniqueid}`, callback);
  }


}
