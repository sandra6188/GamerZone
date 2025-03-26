import { Component, Input } from '@angular/core';
import Producto from '../../models/Producto';

@Component({
  selector: 'app-producto-card',
  imports: [],
  templateUrl: './producto-card.component.html',
  styleUrl: './producto-card.component.css'
})
export class ProductoCardComponent {
  // producto = Input<Producto>
  @Input() producto!: Producto;

}
