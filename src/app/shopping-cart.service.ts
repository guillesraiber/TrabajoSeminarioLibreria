import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin } from 'rxjs';
import { Book } from './book-list/Book';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BookDataService } from './book-data.service';

@Injectable({
  providedIn: 'root'
})

export class ShoppingCartService {
  private items: Book[] = [];
  private itemsSubject = new BehaviorSubject<Book[]>([]);
  public $items = this.itemsSubject.asObservable();

  private errorSnackbarShown = false;

  constructor(private snackBar : MatSnackBar,
              private bookDataService : BookDataService
  ) {}

  addBookToShoppingCart(book: Book) :{ success: boolean, message: string}{
    if (book.quantity < 1 || !book.quantity) {
      return this.showSnackbarOnce('Agregar al menos una unidad :)', 'warning');
    }
    if(book.quantity > book.stock) {
      return this.showSnackbarOnce('No hay suficiente stock', 'warning');
    }

    const encontrado = this.items.find(i => i.id === book.id);
    if (encontrado) {
      encontrado.quantity+= book.quantity;
    } else {
      this.items.push({...book});
  }

  const updatedBook : Book = { ...book, stock : book.stock - book.quantity };
  console.log('📤 Enviando al servidor:', updatedBook);
  this.bookDataService.updateBookStock(updatedBook).subscribe({
    next: updated => {
      console.log('✅ Respuesta del servidor:', updated);
      book.stock = updated.stock;
      this.itemsSubject.next([...this.items]);
      this.showSnackbar('Libro agregado al carrito', 'success');
      this.errorSnackbarShown = false;
    },
    error: (err) => {
      console.error('❌ Error al actualizar stock:', err);
      this.revertCartChanges(book, encontrado);
      this.showSnackbarOnce('Error al actualizar el stock', 'warning');
    }
  });
  return {
    success: true,
    message: 'Procesando...'
  };
}

getItems(): Book[]{
  return [...this.items];
}

remove(bookId: string) {
  const index = this.items.findIndex(item => item.id === bookId);
  if(index > -1) {
    const removedBook = this.items[index];
    const updatedBook: Book = { 
      ...removedBook, 
      stock: removedBook.stock + removedBook.quantity 
    };

    this.bookDataService.updateBookStock(updatedBook).subscribe({
      next: () => {
        this.items.splice(index, 1);
        this.itemsSubject.next([...this.items]);
    },
    error: () => {
      this.showSnackbarOnce('Error al actualizar el stock', 'error');
    }
    });
  }
}

get total(): number {
  return this.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
}

clearCart() {
  if(this.items.length === 0) return;

  const updates = this.items.map(item => {
  const updatedBook : Book = {
    ...item,
    stock: item.stock + item.quantity
  };
    return this.bookDataService.updateBookStock(updatedBook);
  });

  forkJoin(updates).subscribe({
    next: () => {
      this.items = [];
      this.itemsSubject.next([]);
    },
    error: () => {
      this.showSnackbarOnce('Error al vaciar el carrito', 'error');
      }
    })
  }

  // Método para mostrar snackbar normalmente
  private showSnackbar(message: string, type: 'success' | 'warning' | 'error'): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
      panelClass: [`snackbar-${type}`]
    });
  }

  // Método que muestra el snackbar sólo una vez para evitar mensajes repetidos
  private showSnackbarOnce(message: string, type: 'success' | 'warning' | 'error'): { success: boolean; message: string } {
    if (!this.errorSnackbarShown) {
      this.showSnackbar(message, type);
      this.errorSnackbarShown = true;
    }
    return { success: type !== 'error', message };
  }


  private revertCartChanges(book : Book, encontrado?: Book) : void{
    if (encontrado) {
      encontrado.quantity -= book.quantity;
      if(encontrado.quantity <= 0 ) {
        this.items = this.items.filter(item => item.id !== book.id);
      } 
      } else {
        this.items = this.items.filter(item => item.id !== book.id);
      }
      this.itemsSubject.next([...this.items]);
  }
}
