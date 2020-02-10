import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  userList  = [];

  showError = false;

  constructor(private db: AngularFireDatabase, private userServices: UserService, private router: Router) { }

  ngOnInit() {
    if(this.userServices.loggedInUser) {
      this.router.navigate(['/all-books']);
    }
    this.userServices.getAllUsers();
  }

  onKeyEmail(event) {
    this.email = event.target.value;
  }

  onKeyPassword(event) {
    this.password = event.target.value;
  }

  login() {
    this.showError = false;
    if (!this.email || !this.password) {
      this.showError = true;
    } else {
      for (let user of this.userServices.allUsers) {
        if (user.email === this.email && user.password === this.password) {
          this.userServices.logIn(user);
          this.userServices.getUserBooksID();
          this.userServices.getUserBooks();
          this.router.navigate(['/all-books']);
        }
      }
      if (!this.userServices.loggedInUser) {
        this.showError = true;
      }
    }
  }
}
