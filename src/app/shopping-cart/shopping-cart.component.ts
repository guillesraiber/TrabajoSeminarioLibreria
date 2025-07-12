import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingCartService} from '../shopping-cart.service';
import { Subscription } from 'rxjs';
import { Book } from '../book-list/Book';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-shopping-cart',
  imports: [CommonModule],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.scss'
})
export class ShoppingCartComponent implements OnDestroy, OnInit{
  items : Book[] = [];
  private cartSubscription!: Subscription;

  constructor(private shoppingCartService : ShoppingCartService,
              private snackBar : MatSnackBar
  ) {}

  ngOnInit(): void {
      this.cartSubscription = this.shoppingCartService.$items.subscribe(items => {
        this.items = items;
      });
  }

  ngOnDestroy(): void {
      this.cartSubscription.unsubscribe();
  }

  get total() {
    return this.shoppingCartService.total;
  }

  remove(bookid : string) {
    this.shoppingCartService.remove(bookid);
    this.snackBar.open('Producro eliminado del carrito', 'Cerrar', {
      duration: 2000,
      panelClass: ['snackbar-info']
    });
  }

  clearCart() : void {
    this.shoppingCartService.clearCart();
    this.snackBar.open('Carrito vaciado', 'Cerrar', {
      duration: 2000,
      panelClass: ['snackbar-info']
      });
  }
}
