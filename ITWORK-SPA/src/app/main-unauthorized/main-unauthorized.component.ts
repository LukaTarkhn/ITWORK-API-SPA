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
    this.getValues();
  }

  getValues() {
    this.http.get('http://localhost:5000/api/values').subscribe(response => {
      this.values = response;
    }, error => {
      console.log(error);
    });
  }

}

