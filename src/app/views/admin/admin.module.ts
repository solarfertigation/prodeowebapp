import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule,BsDropdownConfig,BsDropdownDirective } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { CommonModule  } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { GestioneUtentiComponent } from './gestione-utenti/gestione-utenti.component';

import { PaginationModule } from 'ngx-bootstrap/pagination';
import { MultiselectComponent } from 'src/app/helpers/form/multiselect/multiselect.component';
import { MappeComponent } from './mappe/mappe.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { StatsComponent } from './stats/stats.component';
import { BsDatepickerModule, BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SortablejsModule }  from 'ngx-sortablejs';
import { GaugechartComponent } from 'src/app/helpers/gaugechart/gaugechart.component';
import { Gaugechart90Component } from 'src/app/helpers/gaugechart90/gaugechart90.component';
@NgModule({
  providers: [
  
    {provide: BsDropdownDirective}
  ],
  imports: [
    FormsModule,
    AdminRoutingModule,
    ChartsModule,
    BsDropdownModule.forRoot(),
    ButtonsModule.forRoot(),
    ModalModule,
    CommonModule,
    TabsModule,
    PaginationModule,
    BsDatepickerModule.forRoot(),
    SortablejsModule,
    
  ],
  declarations: [
    GestioneUtentiComponent,
    MultiselectComponent,
    MappeComponent,
    StatsComponent,
    GaugechartComponent,
    Gaugechart90Component,
   
  ]
})


export class AdminModule { }
