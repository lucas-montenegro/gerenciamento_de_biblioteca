import { Component, OnInit, Input } from '@angular/core';
import { Book } from '../primitives/book';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss']
})
export class BookCardComponent implements OnInit {
  @Input()
  book;
  id: number;

  availabilityText: string;

  constructor() {}

  ngOnInit() {
    if (this.book.availableQuantity === 0) {
      this.availabilityText = 'Nenhuma unidade disponível';
    } else if (this.book.availableQuantity === 1) {
      this.availabilityText = '1 unidade disponível';
    } else {
      this.availabilityText = this.book.availableQuantity + ' unidades disponíveis';
    }
  }

}
