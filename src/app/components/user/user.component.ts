import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  currentUser: User;

  constructor(
    public authService: AuthService,
    private actRoute: ActivatedRoute
  ) {
    this.authService.getUser().subscribe(res => {
      this.currentUser = res["data"];
    })
  }

  ngOnInit() { }

}
