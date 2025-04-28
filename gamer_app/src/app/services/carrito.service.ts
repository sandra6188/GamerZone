import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import Producto from '../models/Producto';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  private carrito: Producto[] = [];
  private carritoSubject = new BehaviorSubject<Producto[]>(this.carrito);

  constructor() { }

  // Agregar un producto al carrito
  agregarAlCarrito(producto: Producto): void {
    this.carrito.push(producto);
    this.carritoSubject.next(this.carrito); // Notificar a los suscriptores
  }

  // Obtener los productos del carrito
  obtenerCarrito() {
    return this.carritoSubject.asObservable();
  }

  // Obtener la cantidad de productos en el carrito
  obtenerCantidadCarrito() {
    return this.carrito.length;
  }
}
