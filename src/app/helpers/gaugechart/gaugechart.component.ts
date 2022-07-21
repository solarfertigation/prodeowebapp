import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-gaugechart',
  templateUrl: './gaugechart.component.html',
  styleUrls: ['./gaugechart.component.scss']
})
export class GaugechartComponent implements OnInit {
  @Input() value:any
  @Input() options:any;
  um="";
  isOut=false;
  minTreshold: number;
  maxTreshold: number;
  minTresholdOriginale: any;
  maxTresholdOriginale: any;
  transformedValue: number;
  minValue: any;
  maxValue: any;
  constructor() { }

  ngOnInit(): void {

    this.minValue = this.options.minValue;
    this.maxValue = this.options.maxValue;
    const diff = this.maxValue-this.minValue;
    const coeff = 180 / diff;
    this.um = this.options.um?this.options.um:"";
    this.minTresholdOriginale = this.options.minTreshold;
    this.maxTresholdOriginale = this.options.maxTreshold;
    this.minTreshold = (this.options.minTreshold-this.minValue)*coeff;
    this.maxTreshold = (this.options.maxTreshold-this.minValue)*coeff;
    this.transformedValue = (this.value-this.minValue)*coeff;
    this.isOut = this.value < this.options.minTreshold || this.value > this.options.maxTreshold;
  }

}
