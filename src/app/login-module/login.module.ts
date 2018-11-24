import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login-component/login.component';
import {AuthenticationService} from "./authentication.service";
import {MatButtonModule, MatInputModule} from "@angular/material";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule
      ],
  providers:[AuthenticationService],
  exports:[
    LoginComponent
  ],
  declarations: [LoginComponent]
})
export class LoginModule { }
