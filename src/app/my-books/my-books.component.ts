import { Component, OnInit, Input } from '@angular/core';
import { Book } from '../primitives/book';
import { UserService } from '../user.service';

@Component({
  selector: 'app-my-books',
  templateUrl: './my-books.component.html',
  styleUrls: ['./my-books.component.scss']
})
export class MyBooksComponent implements OnInit {

  constructor(public userServices: UserService) { }

  ngOnInit() {
    this.userServices.getUserBooksID();
    setTimeout(() => {
      this.userServices.getUserBooks();
    }, 0);
  }

}
