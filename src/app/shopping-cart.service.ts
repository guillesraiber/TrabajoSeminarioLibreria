import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Book } from './book-list/Book';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})

export class ShoppingCartService {
  private items: Book[] = [];
  private itemsSubject = new BehaviorSubject<Book[]>([]);
  public $items = this.itemsSubject.asObservable();

  constructor(private snackBar : MatSnackBar) {}

  addBookToShoppingCart(book: Book) :{ success: boolean, message: string}{
    if (book.quantity < 1) {
      return {
        success: false,
        message: 'Agregar al menos una unidad :)'
      };
    }
    if(book.quantity > book.stock) {
      return {
        success: false,
        message: 'No hay suficiente stock para agregar más unidades '
      };
    }
    const encontrado = this.items.find(i => i.id === book.id);
    if (encontrado) {
      encontrado.quantity+= book.quantity;
    } else {
      this.items.push({...book});
  }
  book.stock -= book.quantity;
  this.itemsSubject.next([...this.items]);
  return {
    success: true,
    message: 'El libro ha sido agregado a tu carrito de compras '
  };
}

getItems(): Book[]{
  return this.items;
}

remove(bookId: string) {
  const index = this.items.findIndex(item => item.id === bookId);
  if(index > -1) {
    this.items.splice(index, 1);
    this.itemsSubject.next([...this.items]);
  }
}

get total(): number {
  return this.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
}

clearCart() {
  this.items = [];
  this.itemsSubject.next([]);
}

}
