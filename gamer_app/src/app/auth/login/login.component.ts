import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [HeaderComponent,FooterComponent, RouterLink, CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    if (!this.username || !this.password) {
      this.errorMessage = 'Todos los campos son obligatorios.';
      return;
    }

    if (this.authService.login(this.username, this.password)) {
      if(this.authService.isAuthenticated() && ['viewer'].includes(this.authService.getRole())){
        this.router.navigate(['/']); 
      }else if(this.authService.isAuthenticated() && ['admin'].includes(this.authService.getRole())){
        this.router.navigate(['/sobrenosotros']); 
      }
    } else {
      this.errorMessage = 'Usuario o contraseña incorrectos.';
    }
  }
}
