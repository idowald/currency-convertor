import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-routing-tabs-component',
  templateUrl: './routing-tabs.component.html',
  styleUrls: ['./routing-tabs.component.scss']
})
export class RoutingTabsComponent implements OnInit {
  routes = [
  { path: 'currencyExchange', label: "CURRENCY CONVERTER" },
  { path: 'conversionHistory' ,label: "VIEW CONVERSION HISTORY"}
];
  constructor() { }

  ngOnInit() {
  }

}
