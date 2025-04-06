import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-perfil',
  imports: [HeaderComponent, FooterComponent, CommonModule, FormsModule, RouterLink],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {
  
  auth: any;

  perfil = { 
    usuario_id: 0,
    usuario_rol: '',
    usuario_nombre: '', 
    usuario_apellidos: '', 
    usuario_username: '',
    usuario_email: '',
    usuario_celular: '',
    usuario_password: '',
    usuario_repeat_password: ''
  };

  errorMessage: string = '';
  successMessage: string = '';

  constructor(public router: Router, public authService: AuthService){}


  ngOnInit(): void {
    if(this.authService.isAuthenticated() && ['viewer','admin'].includes(this.authService.getRole())){

      this.auth = this.authService.getCurrentUser();
      this.perfil.usuario_rol = this.auth?.rol;
      this.perfil.usuario_nombre = this.auth?.nombre;
      this.perfil.usuario_apellidos = this.auth?.apellidos;
      this.perfil.usuario_username = this.auth?.username;
      this.perfil.usuario_email = this.auth?.email;
      this.perfil.usuario_celular = this.auth?.celular;
      this.perfil.usuario_password = this.auth?.password;

    }
  }
  
  redirectToLogin(){

    if (!this.perfil.usuario_nombre || !this.perfil.usuario_apellidos || !this.perfil.usuario_username || 
      !this.perfil.usuario_email || !this.perfil.usuario_celular || !this.perfil.usuario_password) {
      this.errorMessage = 'Todos los campos son obligatorios.';
      return;
    }

    if (!this.validateEmail(this.perfil.usuario_email)) {
      this.errorMessage = 'El formato del email es incorrecto.';
      return;
    }

    if (this.perfil.usuario_celular.length !== 10 || !/^\d+$/.test(this.perfil.usuario_celular)) {
      this.errorMessage = 'El celular debe contener 10 dígitos numéricos.';
      return;
    }

    if (this.perfil.usuario_password.length < 5) {
      this.errorMessage = 'La contraseña debe tener al menos 5 caracteres.';
      return;
    }

    if (this.perfil.usuario_password !== this.perfil.usuario_repeat_password && this.perfil.usuario_password && this.perfil.usuario_repeat_password) {
      this.errorMessage = 'Las contraseñas no coinciden.';
      return;
    }else{
      this.errorMessage = '';
    }

    if(this.authService.isAuthenticated()){

    }else{

    }
  }

  //Función para validar emails
  private validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
