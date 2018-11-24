import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../authentication.service";
import {FormControl, Validators} from '@angular/forms';
import {MyErrorStateMatcher} from "../../commons/myErrorStateMatcher";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-component',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router : Router, private authenticationService: AuthenticationService) { }
  userFormControl = new FormControl('', [
    Validators.required
  ]);
  passwordFormControl = new FormControl('',[
    Validators.required
  ]);
  matcher = new MyErrorStateMatcher();
  ngOnInit() {
    this.authenticationService.logout(); //always logout on this screen
  }
  onSubmit(){
    const promise = this.authenticationService.authenticateUser(this.userFormControl.value, this.passwordFormControl.value);
    promise.then(response=>{
      if(this.authenticationService.isAuthenticated()){
          this.router.navigateByUrl("currencyExchange");
        }else{
        //error message
      }
    });

  }

}
