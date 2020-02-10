import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Book } from '../primitives/book';
import { AvailableBooksService } from '../available-books.service';
import { UserService } from '../user.service';
import { MyBooksComponent } from '../my-books/my-books.component';

@Component({
  selector: 'app-single-book',
  templateUrl: './single-book.component.html',
  styleUrls: ['./single-book.component.scss']
})
export class SingleBookComponent implements OnInit {
  title: string;
  author: string;
  synopsis: string;
  smallDescription: string;
  publicationDate: number;
  availableQuantity: number;
  imgSrc: string;
  id: string;

  book = null;

  loading = true;

  availabilityText: string;

  showError = false;

  success = false;

  bookAlreadyInDB = false;

  constructor(public userServices: UserService, public availableBooks: AvailableBooksService, public route: ActivatedRoute, public router: Router) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['$key'];
    });
    for(let book of this.availableBooks.getAvailableBooks()) {
      if(book.$key === this.id) {
        this.book = book;
      }
    }
    this.availableBooks.getAllBooks();
    this.userServices.getUserBooksID();
    this.userServices.getUserBooks();
    this.setText();
  }

  onKeyTitle(event) {
    this.title = event.target.value;
  }

  onKeyAuthor(event) {
    this.author = event.target.value;
  }

  onKeySynopsis(event) {
    this.synopsis = event.target.value;
  }

  onKeySmallDescription(event) {
    this.smallDescription = event.target.value;
  }

  onKeyPublicationDate(event) {
    this.publicationDate = event.target.value;
  }

  onKeyAvailableQuantity(event) {
    this.availableQuantity = parseInt(event.target.value, 10);
  }

  onKeyImgSrc(event) {
    this.imgSrc = event.target.value;
  }

  setText() {
    this.loading = true;
    if (this.book.availableQuantity === 0) {
      this.availabilityText = 'Nenhuma unidade disponível';
    } else if (this.book.availableQuantity === 1) {
      this.availabilityText = '1 unidade disponível';
    } else {
      this.availabilityText = this.book.availableQuantity + ' unidades disponíveis';
    }
    setTimeout(() => {
      this.loading = false;
    }, 0);
  }

  borrowBook(book) {
    this.userServices.addUserBook(book);
    this.book.availableQuantity -= 1;
    this.availableBooks.updateBook(book);
    this.setText();
    this.userServices.getUserBooksID();
    setTimeout(() => {
      this.availableBooks.getAllBooks();
      this.userServices.getUserBooks();
    }, 0);
  }

  isBorrowed(book) {
    for(let i = 0; i < this.userServices.myBooks.length; i++) {
      if (this.userServices.myBooks[i].$key === book.$key) {
        return true;
      }
    }
    return false;
  }

  returnBook(book) {
    this.book.availableQuantity += 1;
    this.availableBooks.updateBook(book);
    this.userServices.deleteUserBook(book, this.userServices.loggedInUser);
    this.setText();
    this.userServices.getUserBooksID();
    setTimeout(() => {
      this.availableBooks.getAllBooks();
      this.userServices.getUserBooks();
    }, 0);
  }

  deleteBook() {
    if (confirm('Apagar Livro ?')) {
      this.userServices.allUsers.forEach(user => {
        this.userServices.deleteSomeUserBook(user, this.book.$key);
      });
      this.availableBooks.deleteBook(this.book);
      setTimeout(() => {
        this.availableBooks.getAllBooks();
      }, 0);
      this.router.navigate(['/all-books']);
    }
  }

  editBook(book) {
    this.showError = false;
    this.success = false;
    this.bookAlreadyInDB = false;
    if (this.title) {
      book.title = this.title;
    }
    if (this.author) {
      book.author = this.author;
    }
    if (this.synopsis) {
      book.synopsis = this.synopsis;
    }
    if (this.smallDescription) {
      book.smallDescription = this.smallDescription;
    }
    if (this.publicationDate) {
      book.publicationDate = this.publicationDate;
    }
    if (this.availableQuantity) {
      book.availableQuantity = this.availableQuantity;
    }
    if (this.imgSrc) {
      book.imgSrc = this.imgSrc;
    }
    if (!this.title && !this.author && !this.synopsis && !this.smallDescription && !this.publicationDate && !this.availableQuantity && !this.imgSrc) {
      this.showError = true;
    } else if (this.availableBooks.searchBook(this.title)) {
      this.bookAlreadyInDB = true;
    } else {
      this.availableBooks.updateBook(book);
      this.success = true;
      setTimeout(() => {
        this.availableBooks.getAllBooks();
      }, 0);
    }
  }
}
