import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "./login-module/authentication.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  title = 'client';
  constructor(private router: Router, private authenticationService: AuthenticationService){}
  ngOnInit(): void {
    this.authenticate();
  }
  authenticate(){
    if (!this.authenticationService.isAuthenticated()){
      this.router.navigateByUrl("login");
    }
  }

}
