import { Component,  Input, OnInit, Output, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
@Component({
  selector: 'app-multiselect',
  templateUrl: './multiselect.component.html',
  styleUrls: ['./multiselect.component.scss'],
  providers: [
    { 
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultiselectComponent),
      multi: true
    }
  ]
})
export class MultiselectComponent implements ControlValueAccessor, OnInit {
  @Input() data:any
  @Input() showSelect:boolean=false;
  @Input() color:string="primary"
  @Input() labelProperties:string
  @Input() valueProperties:string
  _value: any;
  showdata: any;
  selectedData:any;
  search:string;
  constructor() {
    
   }

  ngOnInit(): void {
    this.showdata = this.data;

  }
 
  _onChangeCallback(value){
    
  }
  onModelChange(value) {
    this._value = value;
    
    this._onChangeCallback(value);

  }

  getSelectedData(){
    return this.data.filter(d => this._value.find(v => v ==d[this.valueProperties])!=null);
    
  }

  isSelected(value){
    return this._value.find(v => v == value)!=null
  }

  toggleData(value){
    let _value = JSON.parse(JSON.stringify(this._value));
    const index = _value.findIndex(v => v == value);
    if(index < 0){
      _value.push(value)
    }else{
      _value.splice(index, 1);
    }

    this.onModelChange(_value);
  }

  openSelect(){
    this.search = "";
    this.filterData();
  }
  filterData(){
    this.showdata = this.data.filter(v => v[this.labelProperties].toLowerCase().indexOf(this.search.toLowerCase())>=0)
  }

  get value(): any { return this._value; };

  set value(v: any) {
    if (v !== this._value) {
      
      this._value = v;
      this._onChangeCallback(v);
    }
  }
  writeValue(value: any) {
    this._value = value   
    
  }

  registerOnChange(fn: any) {
    this._onChangeCallback = fn;
  }

  propagateTouch = (_: any) => {};
  registerOnTouched(fn) {
    this.propagateTouch = fn;
  }

}
