import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service'
import { StorageService } from "src/app/services/storage.service";
@Injectable({
  providedIn: 'root'
})
export class DevicesService extends AuthService {

  constructor(protected override http: HttpClient,protected override storage:StorageService) {
    super(http,storage);
    this.endpoint = "devices";
    this.endpointSingle = "devices";
  }
}
