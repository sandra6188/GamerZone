import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import Usuario from '../../models/Usuario';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CommonModule, FormsModule, NgxPaginationModule, RouterLink],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})
export class UsuarioComponent {

  auth: any;
  page: number = 1;
  itemsPerPage: any;

  users: Usuario[] = [];
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.auth = this.authService.getRole();
    this.itemsPerPage = this.auth === 'admin' ? 6 : 3;

    this.authService.users$.subscribe(data => {
      this.users = data;
      console.log("Usuarios cargados:", this.users);
    });
   
  }

  eliminarUsuario(id: number): void {
    if (this.authService.isAuthenticated()) {
      const confirmDelete = window.confirm('¿Estás seguro de que quieres eliminar este usuario?');
      if (confirmDelete) {
        this.authService.eliminarUsuario(id); // Se usa directamente desde AuthService
        console.log('Usuario eliminado con éxito');
      }
    }
  }

  redirectToLogin(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
    }
  }
}
