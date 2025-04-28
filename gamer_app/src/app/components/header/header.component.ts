import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { CarritoService } from '../../services/carrito.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  user: any;
  cantidadCarrito: number = 0;

  constructor(private authService: AuthService, private router: Router, private carritoService: CarritoService
  ) {}

  ngOnInit() {
    this.user = this.authService.getCurrentUser();
    this.carritoService.obtenerCarrito().subscribe(carrito => {
      this.cantidadCarrito = carrito.length;
    });
  }

  logout() {
    this.authService.logout(); // Cierra sesión
    this.user = null; // Limpia el usuario en la vista
  }
}
