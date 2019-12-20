import { NgModule } from '@angular/core';
import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './reports/reports.component';
import {SharedModule} from "../../shared/shared.module";
import {ChartModule, FullCalendarModule} from "primeng";


@NgModule({
  declarations: [ReportsComponent],
  imports: [
    ChartModule,
    FullCalendarModule,
    SharedModule,
    ReportsRoutingModule,
  ]
})
export class ReportsModule { }
