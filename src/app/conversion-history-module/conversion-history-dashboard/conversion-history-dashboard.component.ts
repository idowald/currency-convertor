import { Component, OnInit, ViewChild} from '@angular/core';
import {ConversionService} from "../conversion-service/conversion.service";
import {Router} from "@angular/router";
import {MatTable} from "@angular/material";

@Component({
  selector: 'app-conversion-history-dashboard',
  templateUrl: './conversion-history-dashboard.component.html',
  styleUrls: ['./conversion-history-dashboard.component.scss']
})
export class ConversionHistoryDashboardComponent implements OnInit {
  @ViewChild(MatTable) table: MatTable<any>;
  conversions:object[] =[];
  showElementActions:object = null;
  conversionHistoryColumns:String[] = ["date", "event", "action"];
  constructor(private conversionService: ConversionService,
              private router: Router) { }
  ngOnInit() {
    this.conversions = this.conversionService.getAllConversions();
  }
  mouseEnter(el){
    this.showElementActions = el;
  }
  mouseExit(el){
    this.showElementActions = null;
  }

  /**
   * This wil reroute to currency exchange page- i use param routing to make it more general (user can save links for
   * example and to show basic knowledge).
   * The best way to do it here- was to connect between routing + service that connects between the two components.
   * this was we can save the "loading" localstorage time
   * @param conversion
   */
  viewEvent(conversion){
    this.router.navigateByUrl(`currencyExchange/${conversion.timestamp}`);
  }
  deleteEvent(conversion){
    const deleted = this.conversionService.deleteConversion(new Date(conversion.timestamp));
    const index = this.conversions.findIndex(_conversion=> _conversion["timestamp"] === conversion.timestamp);
    if (deleted && index>=0){
       this.conversions.splice(index,1);
       this.table.renderRows();

    }


  }

}
