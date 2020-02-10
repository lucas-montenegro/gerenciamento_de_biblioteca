import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from '../primitives/book';
import { User } from '../primitives/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(public userServices: UserService, public router: Router) { }

  ngOnInit() {
    if (!this.userServices.loggedInUser && this.router.url !== '/login' && this.router.url !== '/register') {
      this.router.navigate(['/login']);
    }
  }
}
