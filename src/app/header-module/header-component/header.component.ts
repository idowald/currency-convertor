import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../login-module/authentication.service";
import { Router} from "@angular/router";

@Component({
  selector: 'app-header-component',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService, private router: Router) { }
  authenticated:boolean = true;
  sub:any;
  ngOnInit() {
    this.sub = this.router.events.subscribe(urlSegment=>{
      if (this.router.url.startsWith('/login')){
        this.authenticated =false;
      }else{
        this.authenticated = true;
      }
    });
  }
  logout(){
    this.authenticationService.logout();
    this.router.navigateByUrl("login");
  }
  ngOnDestroy(){
    this.sub.unsubscribe();
  }

}
