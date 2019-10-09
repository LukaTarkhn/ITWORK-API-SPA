import { Component, OnInit } from '@angular/core';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-main-authorized',
  templateUrl: './main-authorized.component.html',
  styleUrls: ['./main-authorized.component.css']
})
export class MainAuthorizedComponent implements OnInit {
  photoUrl: string;
  checked = 'Vacancy';
  constructor(public authService: AuthService, private alertify: AlertifyService, private router: Router) { }

  ngOnInit() {
    this.authService.currentPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl);
  }


  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authService.decodedToken = null;
    this.authService.currentUser = null;
    this.alertify.message('logged out');
    this.router.navigate(['/']);
  }

  toggleMainMenu(checked: string) {
    this.checked = checked;
  }

}
