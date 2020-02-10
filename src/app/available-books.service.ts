import { OnInit, Injectable } from '@angular/core';
import { Book } from './primitives/book';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import 'firebase/database';

@Injectable()
export class AvailableBooksService {
  booksDb: AngularFireList<any>;
  allBooks = [];

  constructor(private db: AngularFireDatabase) { }

  getBooksDb() {
    this.booksDb = this.db.list('book');
    return this.booksDb.snapshotChanges();
  }

  getAllBooks() {
    this.getBooksDb().subscribe( list => {
      this.allBooks = list.map( book => {
        return {
          $key: book.key,
          ...book.payload.val()
        };
      });
    });
  }

  deleteBook(book) {
    this.db.object('book/' + book.$key).remove();
  }

  addBook(book: Book) {
    console.log(book);
    this.db.list('book').push(book).then((result:any) => {
      console.log(result.key);
    });
  }

  returnBook(key: string) {
    this.allBooks.forEach(bk => {
      if (bk.$key === key) {
        return bk;
      }
    });
  }

  updateBook(book) {
    this.booksDb.update(book.$key, {
      author: book.author,
      availableQuantity: book.availableQuantity,
      imgSrc: book.imgSrc,
      publicationDate: book.publicationDate,
      smallDescription: book.smallDescription,
      synopsis: book.synopsis,
      title: book.title
    });
  }

  getAvailableBooks() {
    return this.allBooks;
  }

  searchBook(title: string) {
    for (let i = 0; i < this.allBooks.length; i++) {
      if (this.allBooks[i].title === title) {
        return true;
      }
    }
    return false;
  }

}
