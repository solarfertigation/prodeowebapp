import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-gaugechart90',
  templateUrl: './gaugechart90.component.html',
  styleUrls: ['./gaugechart90.component.scss']
})
export class Gaugechart90Component implements OnInit {
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
    const coeff = 90 / diff;
    this.um = this.options.um?this.options.um:"";
    this.minTresholdOriginale = this.options.minTreshold;
    this.maxTresholdOriginale = this.options.maxTreshold;
    this.minTreshold = (this.options.minTreshold-this.minValue)*coeff;
    this.maxTreshold = (this.options.maxTreshold-this.minValue)*coeff;
    this.transformedValue = (this.value-this.minValue)*coeff;
    this.isOut = this.value < this.options.minTreshold || this.value > this.options.maxTreshold;
  }

}
