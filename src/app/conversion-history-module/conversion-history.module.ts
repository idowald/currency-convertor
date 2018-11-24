import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConversionHistoryDashboardComponent } from './conversion-history-dashboard/conversion-history-dashboard.component';
import {MatButtonModule, MatTableModule} from "@angular/material";
import {ConversionService} from "./conversion-service/conversion.service";

@NgModule({
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule
  ],
  exports:[
    ConversionHistoryDashboardComponent
  ],
  providers:[ConversionService],
  declarations: [ConversionHistoryDashboardComponent]
})
export class ConversionHistoryModule { }
