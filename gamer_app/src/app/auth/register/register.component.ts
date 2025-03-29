import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    if (this.usuario_password !== this.usuario_repeat_password) {
      this.errorMessage = 'Las contraseñas no coinciden.';
      return;
    }

    if (this.authService.register(
      'viewer', 
      this.usuario_nombrecompleto,
      this.usuario_apellidocompleto,
      this.usuario_username,
      this.usuario_email,
      this.usuario_celular,
      this.usuario_password,
      this.usuario_repeat_password
    )) {

      this.successMessage = 'Registro exitoso. Redirigiendo al login...';
      setTimeout(() => this.router.navigate(['/login']), 2000);

    } else {
      this.errorMessage = 'El usuario ya existe.';
    }
  }

  
}
