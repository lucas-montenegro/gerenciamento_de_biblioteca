import { Component, OnInit } from '@angular/core';
import { Book } from '../primitives/book';
import { AvailableBooksService } from '../available-books.service';

@Component({
  selector: 'app-list-books',
  templateUrl: './list-books.component.html',
  styleUrls: ['./list-books.component.scss']
})
export class ListBooksComponent implements OnInit {
  constructor(public availableBooksServices: AvailableBooksService) { }

  ngOnInit() {
    this.availableBooksServices.getAllBooks();
  }
}
