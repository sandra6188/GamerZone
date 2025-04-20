import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [HeaderComponent, FooterComponent, RouterLink, CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  usuario_nombrecompleto: string = '';
  usuario_apellidocompleto: string = '';
  usuario_username: string = '';
  usuario_email: string = '';
  usuario_celular: string = '';
  usuario_password: string = '';
  usuario_repeat_password: string = '';
  usuario_imagen: string = '';

  errorMessage: string = '';
  successMessage: string = '';

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) {}

  register() {
    if (this.usuario_password !== this.usuario_repeat_password) {
      this.errorMessage = 'Las contraseñas no coinciden.';
      return;
    }

    if (!this.usuario_nombrecompleto || !this.usuario_apellidocompleto || !this.usuario_username || 
      !this.usuario_email || !this.usuario_celular || !this.usuario_password || !this.usuario_repeat_password) {
      this.errorMessage = 'Todos los campos son obligatorios.';
      return;
    }

    if (!this.validateEmail(this.usuario_email)) {
      this.errorMessage = 'El formato del email es incorrecto.';
      return;
    }

    if (this.usuario_celular.length !== 10 || !/^\d+$/.test(this.usuario_celular)) {
      this.errorMessage = 'El celular debe contener 10 dígitos numéricos.';
      return;
    }

    if (this.usuario_password.length < 5) {
      this.errorMessage = 'La contraseña debe tener al menos 5 caracteres.';
      return;
    }

    this.authService.register(
      'viewer', 
      this.usuario_nombrecompleto,
      this.usuario_apellidocompleto,
      this.usuario_username,
      this.usuario_email,
      this.usuario_celular,
      this.usuario_password,
      this.usuario_repeat_password,
      this.usuario_imagen = 'assets/img/user.jpg'
    ).subscribe({
      next: () => {
        this.successMessage = 'Registro exitoso. Redirigiendo al login...';
        setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      error: () => {
        this.errorMessage = 'El usuario ya existe o hubo un error en el registro.';
      }
    });
  }

  //Función para validar emails
  private validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  
}
