import { Component, Input } from '@angular/core';
import Producto from '../../models/Producto';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-producto-card',
  imports: [],
  templateUrl: './producto-card.component.html',
  styleUrl: './producto-card.component.css'
})
export class ProductoCardComponent {
  // producto = Input<Producto>
  @Input() producto!: Producto; //De padre a hijo

  constructor(private router: Router, private authService:AuthService){}

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
