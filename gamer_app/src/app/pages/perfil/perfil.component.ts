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
  previewImage: string = '';
  selectedImageBase64: string = ''; // Para almacenar la imagen en base64

  constructor(public router: Router, public authService: AuthService){}


  ngOnInit(): void {
    if(this.authService.isAuthenticated() && ['viewer','admin'].includes(this.authService.getRole())){

      this.auth = this.authService.getCurrentUser();
      this.perfil.usuario_id = this.auth?.id;
      this.perfil.usuario_rol = this.auth?.rol;
      this.perfil.usuario_nombre = this.auth?.nombre;
      this.perfil.usuario_apellidos = this.auth?.apellidos;
      this.perfil.usuario_username = this.auth?.username;
      this.perfil.usuario_email = this.auth?.email;
      this.perfil.usuario_celular = this.auth?.celular;
      this.perfil.usuario_password = this.auth?.password;
      this.perfil.usuario_repeat_password = this.auth?.confirmarPassword;
      this.previewImage = this.auth?.imagen || '';
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

  actualizarPerfil(): void {
    
    if (!this.auth) return;
  
    if(this.authService.isAuthenticated()){
      const usuarioActualizado = {
        id: this.perfil.usuario_id,
        rol: this.perfil.usuario_rol,
        nombre: this.perfil.usuario_nombre,
        apellidos: this.perfil.usuario_apellidos,
        username: this.perfil.usuario_username,
        email: this.perfil.usuario_email,
        celular: this.perfil.usuario_celular,
        password: this.perfil.usuario_password,
        confirmarPassword: this.perfil.usuario_repeat_password,
        imagen: this.selectedImageBase64 || this.auth?.imagen // mantén la imagen actual si no la cambió
      };
    
      this.authService.actualizarUsuario(usuarioActualizado);
      this.authService.login(usuarioActualizado.username, usuarioActualizado.password); // Actualiza sesión
      this.successMessage = 'Perfil actualizado exitosamente.';
    }
  }

  onImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {

      //Validar tamaño de la imagen
      this.errorMessage = '';
      if (file.size > 1000 * 1000) {
        this.errorMessage = 'La imagen es demasiado grande (máx. 100KB)';
        return;
      }
      
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImageBase64 = reader.result as string;
        this.previewImage = this.selectedImageBase64;
      };
      reader.readAsDataURL(file);
    }
  }

  //Función para validar emails
  private validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
}
