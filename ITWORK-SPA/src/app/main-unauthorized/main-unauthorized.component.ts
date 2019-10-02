import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-main-unauthorized',
  templateUrl: './main-unauthorized.component.html',
  styleUrls: ['./main-unauthorized.component.css']
})
export class MainUnauthorizedComponent implements OnInit {
  values: any;
  logOrReg: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }
}

