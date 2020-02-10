import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { User } from '../primitives/user';
import { AvailableBooksService } from '../available-books.service';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import { Book } from '../primitives/book';
import { AngularFireDatabase } from '@angular/fire/database';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  name: string;
  email: string;
  bio: string;
  password: string;
  user: User;

  id: number;

  showError = false;

  success = false;

  userAlreadyInDB = false;

  invalidEmail = false;

  constructor(private userServices: UserService, private router: Router) { }


  ngOnInit() {
    if (this.userServices.loggedInUser) {
      this.router.navigate(['/all-books']);
    }
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

  createUser() {
    this.showError = false;
    this.userAlreadyInDB = false;
    this.success = false;
    this.invalidEmail = false;
    if (!this.name || !this.email || !this.bio || !this.password) {
      this.showError = true;
      this.userAlreadyInDB = false;
      this.success = false;
    } else if (!this.userServices.checkUserEmail(this.email)) {
      this.invalidEmail = true;
    } else if (this.userServices.searchUser(this.email)) {
      this.userAlreadyInDB = true;
    } else {
      this.user = new User(
          this.name,
          this.email,
          this.bio,
          this.password,
          []
      );
      this.userServices.addUser(this.user);
      this.name = '';
      this.email = '';
      this.bio = '';
      this.password = '';
      this.success = true;
      setTimeout(() => {
        this.userServices.getAllUsers();
      }, 0);
    }
  }

}
