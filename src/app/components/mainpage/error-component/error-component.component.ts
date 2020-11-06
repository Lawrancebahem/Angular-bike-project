import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-error-component',
  templateUrl: './error-component.component.html',
  styleUrls: ['./error-component.component.css']
})
export class ErrorComponent implements OnInit {
  // tslint:disable-next-line:variable-name
  private _url = this.router.url;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  get url(): string {
    return this._url;
  }
}
