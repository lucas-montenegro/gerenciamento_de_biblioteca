import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../primitives/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {
  name: string;
  email: string;
  bio: string;
  password: string;

  showError: boolean = null;

  success: boolean = null;

  invalidEmail = false;

  userAlreadyInDB = false;

  showPsswd = false;

  constructor(public userServices: UserService, public route: ActivatedRoute, public router: Router) { }

  ngOnInit() {
  }

  onKeyName(event) {
    this.name = event.target.value;
  }

  onKeyEmail(event) {
    this.email = event.target.value;
  }

  onKeyBio(event) {
    this.bio = event.target.value;
  }

  onKeyPassword(event) {
    this.password = event.target.value;
  }

  editUserProfile() {
    this.showError = false;
    this.success = false;
    this.invalidEmail = false;
    this.userAlreadyInDB = false;
    if (!this.name && !this.email && !this.bio && !this.password) {
      this.showError = true;
    } else if (this.email && !this.userServices.checkUserEmail(this.email)) {
      this.invalidEmail = true;
    } else if (this.userServices.searchUser(this.email)) {
      this.userAlreadyInDB = true;
    } else {
      if (this.name) {
        this.userServices.loggedInUser.name = this.name;
      }
      if (this.email) {
        this.userServices.loggedInUser.email = this.email;
      }
      if (this.bio) {
        this.userServices.loggedInUser.bio = this.bio;
      }
      if (this.password) {
        this.userServices.loggedInUser.password = this.password;
      }
      this.success = true;
      this.userServices.updateUser();
      setTimeout(() => {
        this.userServices.getAllUsers();
      }, 0);
    }
  }

  ofuscatedPassword(): string {
    let a = '';
    for(let i = 0; i < this.userServices.loggedInUser.password.length; i++) {
      a += '*';
    }
    return a;
  }
}
