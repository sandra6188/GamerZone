import { Component, Input } from '@angular/core';
import Producto from '../../models/Producto';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-producto-card',
  imports: [CommonModule],
  templateUrl: './producto-card.component.html',
  styleUrl: './producto-card.component.css'
})
export class ProductoCardComponent {
  // producto = Input<Producto>
  @Input() producto!: Producto; //De padre a hijo
  auth: any;

  perfil = { 
    usuario_rol: '',
  };

  constructor(private router: Router, private authService: AuthService){}

  ngOnInit(): void {
    if(this.authService.isAuthenticated() && ['viewer','admin'].includes(this.authService.getRole())){

      this.auth = this.authService.getCurrentUser();
      this.perfil.usuario_rol = this.auth?.rol;

    }
  }

  redirectToLogin(){
    if(this.authService.isAuthenticated()){
      // this.router.navigate(['/addcarrito']);
      console.log("Usuario Autenticado",this.authService.isAuthenticated());
    }else{
      this.router.navigate(['/login']);
      console.log("Usuario No Autenticado",this.authService.isAuthenticated());
    }
    
  }
}
