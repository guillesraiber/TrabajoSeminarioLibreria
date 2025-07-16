import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingCartService} from '../shopping-cart.service';
import { Book } from './Book';
import { FormsModule } from '@angular/forms';
import { InputIntegerComponent } from '../input-integer/input-integer.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BookDataService } from '../book-data.service';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, FormsModule, InputIntegerComponent],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss'
})
export class BookListComponent implements OnInit {
  books : Book[] = [];
  constructor(
    private shoppingCartService: ShoppingCartService, 
    private bookService : BookDataService,
    private snackBar : MatSnackBar) { }

  addToShoppingCart(book : Book) {
    const result = this.shoppingCartService.addBookToShoppingCart(book);
    if(result.success) {
      book.quantity = 0;
    }
  }

  ngOnInit(): void {
    this.bookService.getAll().subscribe(data => {
      this.books = data.map(book =>({
        ...book,
        quantity: 0
      }));
    });
  }

  maxReached(m : string) {
    this.snackBar.open(m, 'Cerrar', {
      duration: 3000, 
      panelClass: ['snackbar-warning']
    });
  }
}
