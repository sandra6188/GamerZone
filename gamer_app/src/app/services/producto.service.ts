import { Injectable } from '@angular/core';
import Producto from '../models/Producto';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  /*productos: Producto[];

  constructor() {
    this.productos = [] 
  }*/
  private storageKey = 'productos';
  private deletedKey = 'productosEliminados';
  public productos$: BehaviorSubject<Producto[]> = new BehaviorSubject<Producto[]>([]);
  public productosJson: Producto[] = []; // Productos desde el JSON

  constructor(private http: HttpClient) { 
    this.loadProductosFromJson();
    this.loadStoredProductos();
  }

  // Cargar productos desde JSON (sin guardarlos en localStorage)
  private loadProductosFromJson() {
    this.http.get<Producto[]>('assets/json/productos.json').subscribe((jsonProductos) => {
      this.productosJson = jsonProductos; // Guardar los del JSON en una variable
      this.updateProductList(); // Actualizar la lista con JSON + LocalStorage
    });
  }

  // Cargar productos desde localStorage
  loadStoredProductos() {
    this.updateProductList();
    //localStorage.removeItem(this.storageKey); // Eliminar productos guardados
  }

  // Obtener productos desde localStorage
  getStoredProductos(): Producto[] {
    const stored = localStorage.getItem(this.storageKey);
    return stored ? JSON.parse(stored) : [];
  }

  // Guardar productos en localStorage
  private saveToStorage(productos: Producto[]) {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(productos));
      this.updateProductList();
    } catch (e) {
      if (e instanceof DOMException && e.name === 'QuotaExceededError') {
        alert('El límite de almacenamiento fue superado. Limpiando datos guardados.');
        localStorage.removeItem(this.storageKey);
        this.updateProductList();
      } else {
        throw e; // Re-lanza si es otro tipo de error
      }
    }
  }

  // Agregar un nuevo producto solo en localStorage
  agregarProducto(producto: Producto) {
    const productos = this.getStoredProductos();
    productos.push(producto);
    this.saveToStorage(productos);
  }

  // Actualizar un producto
  actualizarProducto(productoActualizado: Producto) {
    const productos = this.getStoredProductos();
    const index = productos.findIndex(p => p.id === productoActualizado.id);

    if (index !== -1) {
      productos[index] = productoActualizado;
    } else {
      productos.push(productoActualizado); // <--- Esto es lo nuevo: si viene del JSON, lo guardas por primera vez
    }
  
    this.saveToStorage(productos);
  }
  /*Eliminar y esconde los del json para que no los saque */
  eliminarProducto(id: number): void {
    const productos = this.getStoredProductos();
    const nuevosProductos = productos.filter(p => p.id !== id);
    this.saveToStorage(nuevosProductos);
  
    // Guardar ID del producto eliminado del JSON (si aplica)
    const idsEliminados = this.getDeletedIds();
    if (!idsEliminados.includes(id)) {
      idsEliminados.push(id);
      localStorage.setItem(this.deletedKey, JSON.stringify(idsEliminados));
    }
  
    this.updateProductList();
     //this.restaurarProductosEliminados();
  }
  
  getDeletedIds(): number[] {
    const eliminados = localStorage.getItem(this.deletedKey);
    return eliminados ? JSON.parse(eliminados) : [];
  }

  restaurarProductosEliminados(): void {
    localStorage.removeItem(this.deletedKey);
    this.updateProductList();
  }
  /*Fin eliminar */

  updateProductList() {
    const storedProducts = this.getStoredProductos();
    const eliminados = this.getDeletedIds();
  
    // Obtener los IDs de productos que ya están en localStorage
    const idsEnStorage = storedProducts.map(p => p.id);
  
    // Filtrar productos del JSON: que no estén eliminados y no estén ya en localStorage
    const productosFiltrados = this.productosJson.filter(p => 
      !eliminados.includes(p.id) && !idsEnStorage.includes(p.id)
    );
  
    // Combinar productos del JSON filtrado + los que están en localStorage
    const combinedProducts = [...productosFiltrados, ...storedProducts];

    // Ordenar por ID de menor a mayor
    combinedProducts.sort((a, b) => a.id - b.id);

    this.productos$.next(combinedProducts);
  
  }

  getTotalDatos(): number {
    const eliminados = this.getDeletedIds();
    // Filtra los productos JSON que no han sido eliminados
    const productosJsonValidos = this.productosJson.filter(p => !eliminados.includes(p.id));
    // Toma los productos guardados en localStorage
    const productosLocal = this.getStoredProductos();
    // Calcula total
    const total = productosJsonValidos.length + productosLocal.length;
    // Puedes devolver total, o total + 1 si es para generar el siguiente ID
    return total + 1;
  }

  //Para traer la fecha y hora actual
  getFormattedDateTime = (): string => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
  
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };
}
