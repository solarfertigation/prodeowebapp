
import { MapsService } from './../../../services/api/auth/maps.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mappe',
  templateUrl: './mappe.component.html',
  styleUrls: ['./mappe.component.scss']
})
export class MappeComponent implements OnInit {
  loaded: boolean = false;
  maps: any;

  constructor(private mService: MapsService) { }

  ngOnInit(): void {
    this.loaded = false;
    this.mService.listAll((data)=>{
      this.maps = [];
      for(let i in data.maps){
        let hasDevice = false;
        for(let dev of data.maps[i].devices){
          if(dev.forbidden == undefined || dev.forbidden == false){
            hasDevice = true;
          }
        }
        if(!hasDevice){
          continue;
        }
        let cols = [];
        
        let cnt = 0;
        for(let j= 0; j < data.maps[i].rows; j++){

          
          let rows = [];
          for(let k= 0; k < data.maps[i].cols; k++){
            let row = {
              x: j,
              y: k,
              class: `color${cnt%6}`,
              device:data.maps[i].devices.find(d => d.position.x == j && d.position.y == k)
            }
            rows.push(row);
            cnt++;
          }
          cols.push(rows);
        }
       
        data.maps[i].mapData = cols;
        this.maps.push(data.maps[i])
        //this.maps[i].arrayRows = rows;
      }
      console.log('this.maps: @31', this.maps);
      this.loaded = true;
    })
  }

}
