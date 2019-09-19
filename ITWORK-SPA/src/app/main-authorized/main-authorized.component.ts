import { Component, OnInit } from '@angular/core';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-authorized',
  templateUrl: './main-authorized.component.html',
  styleUrls: ['./main-authorized.component.css']
})
export class MainAuthorizedComponent implements OnInit {

  constructor(private alertify: AlertifyService, private router: Router) { }

  ngOnInit() {
  }
  logout() {
    localStorage.removeItem('token');
    this.alertify.message('logged out');
    this.router.navigate(['/']);
  }
}
