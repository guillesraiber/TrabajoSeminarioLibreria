import { Component, Input, Output, EventEmitter ,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-integer',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './input-integer.component.html',
  styleUrl: './input-integer.component.scss'
})

export class InputIntegerComponent implements OnInit {
  @Input()
  quantity! : number;

  @Output() 
  quantityChange = new EventEmitter<number>();

  @Output()
  maxReached = new EventEmitter<string>();

  @Input() 
  max! : number;

  ngOnInit() {
    if(this.quantity === undefined || this.quantity === null) {
      this.quantity = 1;
    }
  }

  upQuantity(): void {
    if(this.quantity < this.max){
      this.quantity = this.quantity + 1;
      this.quantityChange.emit(this.quantity);
    }else {
      this.maxReached.emit("Se alcanzo el maximo");
    }
  }

  downQuantity(): void {
    if(this.quantity > 0)
    this.quantity = this.quantity - 1;
    this.quantityChange.emit(this.quantity);
  }

  onChangeQuantity(event : Event): void {
    if(event.target instanceof HTMLInputElement) {
      let value = Math.floor(Number(event.target.value));
      if(isNaN(value) || value < 0) {
        value = 0;
      } else if (value > this.max) {
        value = this.max;
      }
      this.quantity = value;
      event.target.value = value.toString();
      this.quantityChange.emit(this.quantity);
      }
  }
}

