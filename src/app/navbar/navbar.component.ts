import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { AvailableBooksService } from '../available-books.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  search: string = null;
  foundBook = false;

  constructor(public userFromService: UserService, public availableBooks: AvailableBooksService, public router: Router) { }

  ngOnInit() {
    this.availableBooks.getAllBooks();
  }

  onKey(event) {
    this.search = event.target.value;
  }

  searchBook() {
    if (this.search) {
      const books = this.availableBooks.getAvailableBooks();
      console.log(books);
      for (let i = 0; i < books.length; i++) {
        if (books[i].title.toLocaleLowerCase() === this.search.toLocaleLowerCase()) {
          this.foundBook = true;
          this.router.navigate(['/book', books[i].$key]);
          break;
        }
      }
    }
    if (!this.foundBook) {
      alert('Não foi possível encontrar o livro pesquisado!');
    }

    this.foundBook = false;
  }
}
