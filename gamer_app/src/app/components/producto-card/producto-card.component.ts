import { Component, Input } from '@angular/core';
import Producto from '../../models/Producto';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-producto-card',
  imports: [RouterLink, CommonModule],
  templateUrl: './producto-card.component.html',
  styleUrl: './producto-card.component.css'
})
export class ProductoCardComponent {

  // producto = Input<Producto>
  @Input() producto!: Producto; //De padre a hijo

  auth: any;
  productos: any[] = [];

  perfil = { 
    usuario_rol: '',
  };

  constructor(private router: Router, private authService: AuthService, private productoService: ProductoService){}

  ngOnInit(): void {
    if(this.authService.isAuthenticated() && ['viewer','admin'].includes(this.authService.getRole())){

      this.auth = this.authService.getCurrentUser();
      this.perfil.usuario_rol = this.auth?.rol;

    }

  }


  redirectToLogin(){
    if(this.authService.isAuthenticated()){
      console.log("Usuario Autenticado",this.authService.isAuthenticated());
      if(['viewer'].includes(this.authService.getRole())){
        this.router.navigate(['/detail-addcarrito', this.producto.id]);
      }
      else if(['admin'].includes(this.authService.getRole())){
        this.eliminarProducto(this.producto.id);
      }
    }else{
      this.router.navigate(['/login']);
      console.log("Usuario No Autenticado",this.authService.isAuthenticated());
    }
    
  }

  eliminarProducto(id: number): void {
    // Confirmación de eliminación
    const confirmDelete = window.confirm('¿Estás seguro de que quieres eliminar este producto?');
    if (confirmDelete) {
      // Llamamos al servicio para eliminar el producto
      this.productoService.eliminarProducto(id); 
      console.log('Producto eliminado con éxito');
    }
  }
}
