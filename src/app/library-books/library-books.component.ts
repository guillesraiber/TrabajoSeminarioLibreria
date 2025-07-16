import { Component } from '@angular/core';
import { ShoppingCartComponent } from '../shopping-cart/shopping-cart.component';
import { BookListComponent } from '../book-list/book-list.component';
@Component({
  selector: 'app-library-books',
  standalone: true,
  imports: [ShoppingCartComponent, BookListComponent],
  templateUrl: './library-books.component.html',
  styleUrl: './library-books.component.scss'
})
export class LibraryBooksComponent {

}
