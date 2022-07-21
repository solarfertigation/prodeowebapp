import { StatsService } from './../../../services/api/auth/stats.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { itLocale } from 'ngx-bootstrap/locale';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { DevicesService } from 'src/app/services/api/auth/devices.service';
defineLocale('it', itLocale);

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {
  @ViewChild('nuovoWidget') public nuovoWidget: ModalDirective;
  @ViewChild('eliminaWidget') public eliminaWidget: ModalDirective;
  @ViewChild('nuovaDashboard') public nuovaDashboard: ModalDirective;
  @ViewChild('modalEmptyDashboard') public modalEmptyDashboard: ModalDirective;
  @ViewChild('eliminaDashboard') public eliminaDashboard: ModalDirective;
  loaded=false;
  dashboard:any;
  data:any;
  dashboard_uniqueid:string;
  range:any = null;
  selectedDevice: null;
  devices: any;
  properties: any;
  hasData: any = [];
  lineChartData: any = [];
  lineChartLabels: any = [];
  campionamenti: any = {
    "15m": "Quartorario",
    "1h": "Orario",
    "1d": "Giornaliero",
    "1m": "Mensile",
  }
  dimensioni: any = {
    "4": "33%",
    "5": "40%",
    "6": "50%",
    "7": "60%",
    "8": "66%",
    "12": "100%",
  }
  sortableOptions = {
    handle: '.card-head',
    ghostClass: 'blue-background-class',
    onUpdate: (event: any) => {
      this.sService.updateData(this.data, this.dashboard_uniqueid, () => { });
    }
  };
  lineChartOptions: any = {
    animation: false,
    responsive: true,
    maintainAspectRatio: false
  };
  lineChartColours: Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  lineChartLegend = true;
  lineChartType = 'line';
  selectedProperties: string;
  widgetIndexDelete: any;
  modal_type: string;
  dashboard_name: string;
  show_dashboard_error: boolean;
  type: string;
  minTreshold: number;
  maxTreshold: number;
  valueTachometer = [];
  optionsTachometer= [];
  unitamisura: any = [];
  
  constructor(private sService: StatsService, private localeBsService: BsLocaleService, private dService: DevicesService) {
    this.unitamisura['batteryVoltage'] = "V";
    this.unitamisura['batteryPercentage'] = "%";
    this.unitamisura['humidity']= "%";
    this.unitamisura['temperature']="°C";
    this.unitamisura['water']="°";
    this.localeBsService.use('it');  
   }

  ngOnInit(): void {
    this.localeBsService.use('it'); 
    this.loaded=false;
    this.sService.getDashboards((dashboard)=>{
      this.dService.listAll((devices)=>{
        this.devices = devices.devices;
        this.dashboard = dashboard;
        this.dashboard_uniqueid = dashboard[0].uniqueid;
        this.data = dashboard[0].data;
        this.loaded = true;
        let datestart = new Date();
        datestart.setDate(datestart.getDate() - 7);
        let dateend = new Date();
        this.range = [
          datestart,
          dateend
        ];
      /*  for(let i in this.data.widgets){
          this.getDataWidget(this.data.widgets[i].index)
        }*/
      });
    });
  }

  changedDashboard(){
    
    this.sService.getDashboard(this.dashboard_uniqueid,(dashboard)=>{
      this.data = dashboard.data
      for (let i in this.data.widgets) {
        this.hasData[this.data.widgets[i].index] = false;
        this.getDataWidget(this.data.widgets[i].index)
      }
    })
    
  }
  getDataWidget(index) {
    let dateStart = this.range[0];
    let month = dateStart.getMonth() + 1;
    month = month > 10 ? month : `0${month}`;
    let day = dateStart.getDate();
    day = day > 10 ? day : `0${day}`;
    let year = dateStart.getFullYear();
    dateStart = `${year}-${month}-${day}`;

    let dateEnd = this.range[1];
    let monthEnd = dateEnd.getMonth() + 1;
    monthEnd = monthEnd > 10 ? monthEnd : `0${monthEnd}`;
    let dayEnd = dateEnd.getDate();
    dayEnd = dayEnd > 10 ? dayEnd : `0${dayEnd}`;
    let yearEnd = dateEnd.getFullYear();
    dateEnd = `${yearEnd}-${monthEnd}-${dayEnd}`;
    let widget = this.data.widgets.find(w => w.index == index);
    const device_id = widget.device;
    const property = widget.property;
    const sampling = widget.sampling;
    const data = {
      dateStart,
      dateEnd,
      device_id,
      property,
      sampling,
      index,
      type:widget.type,
    }

    this.sService.getData(data, (data) => {
      
      if(data.type == "linear"){
        this.lineChartData[data.index] = data.lineChartData;
        this.lineChartLabels[data.index] = data.lineChartLabels;
        this.hasData[data.index] = true;
      }else{
        data.value *= 10;
        data.value = parseInt(data.value);
        data.value /= 10;
        this.valueTachometer[data.index] = data.value
        const wd = this.data.widgets.find(w => w.index == index);
        let minTreshold = wd.minTreshold;
        let maxTreshold = wd.maxTreshold;
        let laterali = (maxTreshold - minTreshold)*0.5;
        let minValue = minTreshold - laterali;
        let maxValue = maxTreshold + laterali;

        if(data.value<minValue){
          minValue = data.value - laterali;
        }
        if(data.value>maxValue){
          maxValue = data.value + laterali;
        }
        if(wd.property == "batteryPercentage" || wd.property == "humidity"){
          if(maxValue > 100){
            maxValue = 100;
          }
          if(minValue < 0){
            minValue = 0;
          }
        }
        const mult = 100/(maxValue - minValue)

         const unitamisura = [];
         
        this.optionsTachometer[data.index] = {
          minValue,
          maxValue,   
          minTreshold,
          maxTreshold,
          um:this.unitamisura[property]
        }
        
        this.hasData[data.index] = true;
      }
      
    })

  }
  changedDate(){
    for (let i in this.data.widgets) {
      this.getDataWidget(this.data.widgets[i].index)
    }
  }

  confirmAggiungi(){
    const device = this.devices.find(d => d.deviceID == this.selectedDevice);
    const property = this.properties.find(d => d.value == this.selectedProperties);
    if (this.data.maxIndex == undefined) {
      this.data.maxIndex = 0;
    }
    this.data.maxIndex++;
    const widget = {
      size: 6,
      device: this.selectedDevice,
      property: this.selectedProperties,
      deviceName: device.name,
      propertyName: property,
      sampling:'1d',
      index: this.data.maxIndex,
      type: this.type,
      minTreshold: this.minTreshold,
      maxTreshold: this.maxTreshold,
    }
    if(this.type == "tachometer"){
      widget.size = 5;
    }
    if (this.data.widgets == undefined) {
      this.data.widgets = [];
    }
    this.data.widgets.push(widget);
    this.sService.updateData(this.data,this.dashboard_uniqueid,()=>{});
    this.nuovoWidget.hide();
    this.getDataWidget(this.data.maxIndex);
  }

  setSize(size, index) {
    let windex = this.data.widgets.findIndex(w => w.index == index);
    this.data.widgets[windex].size = size;
    this.sService.updateData(this.data, this.dashboard_uniqueid, () => { });
    this.getDataWidget(index);
  }

  setSampling(sampling, index) {
    let windex = this.data.widgets.findIndex(w => w.index == index);
    this.data.widgets[windex].sampling = sampling;
    this.sService.updateData(this.data, this.dashboard_uniqueid, () => { });
    this.getDataWidget(index);
  }
  
  confirmEliminaWidget(){
    let index = this.data.widgets.findIndex(w => w.index == this.widgetIndexDelete);
    this.data.widgets.splice(index,1);
    this.sService.updateData(this.data, this.dashboard_uniqueid, () => { });
    this.eliminaWidget.hide();
  }
  deleteWidget(index){
    this.widgetIndexDelete = index;
    this.eliminaWidget.show();
  }
  addWidget(){
    this.selectedDevice = this.devices[0].deviceID;
    this.type="linear";
    this.minTreshold=0;
    this.maxTreshold=0;
    this.changedDevice();
    this.nuovoWidget.show();
  }

  emptyDashboard(){
    this.modalEmptyDashboard.show();
  }

  confirmEmptyDashboard(){
    this.data = {};
    this.sService.updateData(this.data, this.dashboard_uniqueid, () => { });
    this.modalEmptyDashboard.hide();
  }

  deleteDashboard(){
    this.eliminaDashboard.show();
  }

  confirmEliminaDashboard(){
    this.sService.eliminaDashboard(this.dashboard_uniqueid,()=>{
      this.sService.getDashboards((dashboard) => {
        this.dashboard = dashboard;
        this.dashboard_uniqueid = dashboard[0].uniqueid;
        this.changedDashboard();
        this.eliminaDashboard.hide();
      });
    })
  }


  changedDevice(){
    const device = this.devices.find(d => d.deviceID == this.selectedDevice);
    if(device.type == "temperature"){
      this.properties = [
        {"value":"temperature","label":"Temperatura"},
        {"value":"humidity","label":"Umidità"},
        {"value":"batteryPercentage","label":"Percentuale batteria"},
        {"value":"batteryVoltage","label":"Tensione batteria"},
      ];
      
      this.selectedProperties = "temperature";
    }else{
      this.properties = [
        {"value":"water","label":"Presenza acqua"},
        {"value":"batteryPercentage","label":"Percentuale batteria"},
        {"value":"batteryVoltage","label":"Tensione batteria"},
      ];

      this.selectedProperties = "water";
    }

  }

  rinominaDashboard(){
    this.sService.getDashboard(this.dashboard_uniqueid,(dashboard)=>{
      this.modal_type = "Modifica";
      this.dashboard_name =dashboard.name;
      this.show_dashboard_error = false;
      this.nuovaDashboard.show();
    });
  }


  addDashboard() {
    this.modal_type = "Aggiungi";
    this.dashboard_name = "";
    this.show_dashboard_error = false;
    this.nuovaDashboard.show();
  }

  salvaDashboard() {
    this.show_dashboard_error = false;
    if (this.dashboard_name.trim() == "") {
      this.show_dashboard_error = true;
      return;
    }
    if(this.modal_type == "Aggiungi"){
      this.sService.addDashboards(this.dashboard_name, (dashboard_uniqueid) => {
        this.sService.getDashboards((dashboard) => {
          this.dashboard = dashboard;
          this.dashboard_uniqueid = dashboard_uniqueid;
          this.changedDashboard();
          this.nuovaDashboard.hide();
        });
      })
    }else{
      this.sService.rinominaDashboards(this.dashboard_uniqueid, this.dashboard_name, (dashboard_uniqueid) => {
        this.sService.getDashboards((dashboard) => {
          this.dashboard = dashboard;
          this.nuovaDashboard.hide();
        });
      })
    }
  }
}
