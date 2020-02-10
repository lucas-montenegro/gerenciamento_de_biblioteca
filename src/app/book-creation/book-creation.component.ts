import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { AvailableBooksService } from '../available-books.service';
import { Book } from '../primitives/book';
@Component({
  selector: 'app-book-creation',
  templateUrl: './book-creation.component.html',
  styleUrls: ['./book-creation.component.scss']
})
export class BookCreationComponent implements OnInit {
  title: string;
  author: string;
  synopsis: string;
  smallDescription: string;
  publicationDate: number;
  availableQuantity: number;
  imgSrc: string;

  showError = false;

  success = false;

  bookAlreadyInDB = false;

  constructor(public userServices: UserService, public availableBooksServices: AvailableBooksService, public router: Router) { }

  ngOnInit() { }

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
    this.publicationDate = parseInt(event.target.value, 10);
  }

  onKeyAvailableQuantity(event) {
    this.availableQuantity = parseInt(event.target.value, 10);
  }

  onKeyImgSrc(event) {
    this.imgSrc = event.target.value;
  }

  createBook() {
    this.showError = false;
    this.bookAlreadyInDB = false;
    this.success = false;
    if (!this.title || !this.author || !this.synopsis || !this.smallDescription || !this.publicationDate || !this.availableQuantity || !this.imgSrc) {
      this.showError = true;
    } else if (this.availableBooksServices.searchBook(this.title)) {
      this.bookAlreadyInDB = true;
    } else {
      this.availableBooksServices.addBook(
        new Book(this.title,
          this.author,
          this.synopsis,
          this.smallDescription,
          this.publicationDate,
          this.availableQuantity,
          this.imgSrc
          ));
      this.success = true;
      setTimeout(() => {
        this.availableBooksServices.getAllBooks();
      }, 0);
    }
  }
}
