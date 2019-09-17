import { Component, OnInit, Input, Output } from '@angular/core';
import { AuthService } from '../../_services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  @Input() valuesFromHome: any;

  model: any = {};


  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  register() {
    this.authService.register(this.model).subscribe(() => {
      console.log('registration successful')
    }, error => {
      console.log(error);
    });
  }
}
