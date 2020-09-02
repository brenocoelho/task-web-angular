import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  public loginInvalid: boolean

  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public router: Router
  ) {
    this.loginForm = this.fb.group({
      username: [''],
      password: ['']
    })
  }

  ngOnInit() { }

  loginUser() {
    this.loginInvalid = false;
    
    // this.authService.login(this.loginForm.value);

    this.authService.login(this.loginForm.value)
    .subscribe(
        data => { this.router.navigate(['home']); },
        error => { this.loginInvalid = true; }
      );

  }

}
