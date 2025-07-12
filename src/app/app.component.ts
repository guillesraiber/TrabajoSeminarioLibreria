import { Component } from '@angular/core';
import { RouterOutlet, RouterModule, Router } from '@angular/router';
import { BookListComponent } from './book-list/book-list.component';
import { ShoppingCartComponent } from "./shopping-cart/shopping-cart.component";
import { InputIntegerComponent} from "./input-integer/input-integer.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, BookListComponent, ShoppingCartComponent, RouterModule, InputIntegerComponent],
  templateUrl:'./app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Libreria';
}
