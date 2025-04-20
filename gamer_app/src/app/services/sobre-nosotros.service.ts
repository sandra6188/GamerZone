import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SobreNosotrosService {
  private readonly STORAGE_KEY = 'descripcion_sobre_nosotros';

  private descripcionSource = new BehaviorSubject<string>(
    localStorage.getItem(this.STORAGE_KEY) || `
      <p class="card-description">Somos una tienda de videojuegos en línea dedicada a ofrecer los mejores títulos para todos los gustos y plataformas. En nuestro catálogo encontrarás juegos de acción, aventura, RPG, estrategia y mucho más.</p>
      <p class="card-description">🔹 <strong>Variedad de Juegos:</strong> Desde éxitos AAA hasta joyas indie.</p>
      <p class="card-description">🔹 <strong>Compras Seguras:</strong> Métodos de pago confiables y accesibles.</p>
      <p class="card-description">🔹 <strong>Actualizaciones Constantes:</strong> Siempre con los últimos lanzamientos.</p>
      <p class="card-description">🔹 <strong>Experiencia de Usuario:</strong> Navegación intuitiva y soporte al cliente.</p>
      <p class="card-description">📍 Explora, compra y disfruta de la mejor experiencia gamer con nosotros. 🚀🎮</p>
    `
  );
  private readonly IMAGEN_KEY = 'imagen_sobre_nosotros';

  descripcion$ = this.descripcionSource.asObservable();

  setDescripcion(nuevaDescripcion: string) {
    localStorage.setItem(this.STORAGE_KEY, nuevaDescripcion);
    this.descripcionSource.next(nuevaDescripcion);
  }

  getDescripcion(): string {
   // localStorage.removeItem('imagen_sobre_nosotros'); borra la imagen de local Storage
    return this.descripcionSource.getValue();
  }

  /*Imagen */
  private imagenSource = new BehaviorSubject<string>(
    localStorage.getItem(this.IMAGEN_KEY) || 'assets/home/nosotros.jpg'
  );

  imagen$ = this.imagenSource.asObservable();

  setImagen(nuevaRuta: string) {
    localStorage.setItem(this.IMAGEN_KEY, nuevaRuta);
    this.imagenSource.next(nuevaRuta);
  }
}
