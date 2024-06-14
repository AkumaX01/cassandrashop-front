// signup.component.ts
import { Component } from '@angular/core';
import { AutenticacionLogService } from '../autenticacion-log.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  username: string = '';
  password: string = '';
  role: string = 'user'; // default role

  constructor(private autenticacionLogService: AutenticacionLogService, private router: Router) {}

  
}
