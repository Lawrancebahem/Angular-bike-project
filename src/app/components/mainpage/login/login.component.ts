import { Component, OnInit } from '@angular/core';
import {SessionSbService} from "../../../services/session-sb.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private sessionService:SessionSbService) { }

  ngOnInit(): void {
  }


  public onLogIn(email:string, password:string) {

    this.sessionService.signIn(email, password);
  }

}
