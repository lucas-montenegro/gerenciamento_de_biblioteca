import { OnInit, Injectable } from '@angular/core';
import { User } from './primitives/user';
import { Book } from './primitives/book';
import { AvailableBooksService } from './available-books.service';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import 'firebase/database';
import { isNgTemplate } from '@angular/compiler';

@Injectable()
export class UserService {
  usersDb: AngularFireList<any>;
  userBooksDbPath: AngularFireList<any>;
  allUsers = [];
  myBooks = [];
  myBooksID = [];
  loggedInUser = null;

  someUserBooksID = [];
  someUserBooksDbPath: AngularFireList<any>;

  constructor(public db: AngularFireDatabase, private availableBooks: AvailableBooksService) { }

  getUsersDb() {
    this.usersDb = this.db.list('user');
    return this.usersDb.snapshotChanges();
  }

  getAllUsers() {
    this.getUsersDb().subscribe( list => {
      this.allUsers = list.map( user => {
        return {
          $key: user.key,
          ...user.payload.val()
        };
      });
    });
  }

  addUser(user: User) {
    this.db.list('user').push(user);
  }

  updateUser() {
    this.usersDb.update(this.loggedInUser.$key, {
      name: this.loggedInUser.name,
      email: this.loggedInUser.email,
      bio: this.loggedInUser.bio,
      password: this.loggedInUser.password
    });
  }

  addUserBook(book) {
    this.db.list('user/' + this.loggedInUser.$key + '/books').push({
      bookKey: book.$key,
    });
  }

  getUserBooksDb() {
    this.userBooksDbPath = this.db.list('user/' + this.loggedInUser.$key + '/books');
    return this.userBooksDbPath.snapshotChanges();
  }

  getUserBooksID() {
    this.getUserBooksDb().subscribe( list => {
      this.myBooksID = list.map( book => {
        return {
          $key: book.key,
          ...book.payload.val()
        };
      });
    });
  }

  getUserBooks() {
    this.myBooks = [];
    for (let i = 0; i < this.myBooksID.length; i++) {
      for (let book of this.availableBooks.allBooks) {
        if (book.$key === this.myBooksID[i].bookKey) {
          this.myBooks.push(book);
          break;
        }
      }
    }
  }

  deleteUserBook(book, user) {
    for(let i = 0; i < this.myBooksID.length; i++) {
      if (this.myBooksID[i].bookKey === book.$key) {
        this.db.object('user/' + user.$key + '/books/' + this.myBooksID[i].$key).remove();
        break;
      }
    }
  }

  getSomeUserBooksDb(user) {
    this.someUserBooksDbPath = this.db.list('user/' + user.$key + '/books');
    return this.someUserBooksDbPath.snapshotChanges();
  }

  getSomeUserBooksID(user) {
    this.getSomeUserBooksDb(user).subscribe( list => {
      this.someUserBooksID = list.map( book => {
        return {
          $key: book.key,
          ...book.payload.val()
        };
      });
    });
  }

  deleteSomeUserBook(user, key: string) {
    this.getSomeUserBooksID(user);
    setTimeout(() => {
      for(let i = 0; i < this.someUserBooksID.length; i++) {
        if (this.someUserBooksID[i].bookKey === key) {
          this.db.object('user/' + user.$key + '/books/' + this.someUserBooksID[i].$key).remove();
        }
      }
    }, 0);
  }

  logIn(user) {
    this.loggedInUser = user;
  }

  logOut() {
    this.loggedInUser = null;
  }

  searchUser(email: string) {
    for (let i = 0; i < this.allUsers.length; i++) {
      if (this.allUsers[i].email === email) {
        return true;
      }
    }
    return false;
  }

  checkUserEmail(email: string) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return true;
    }
    return false;
  }
}
