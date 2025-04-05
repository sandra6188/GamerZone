import { Component } from '@angular/core';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';
import { ProductoService } from '../../services/producto.service';
import { ProductoCardComponent } from '../../components/producto-card/producto-card.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-producto',
  imports: [HeaderComponent,FooterComponent, ProductoCardComponent, CommonModule, NgxPaginationModule],
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.css'
})
export class ProductoComponent {
  auth: any;

  perfil = { 
    usuario_rol: '',
  };
  page: number = 1;

  constructor(public productoService: ProductoService, public authService: AuthService){}

  ngOnInit(): void {
    if(this.authService.isAuthenticated() && ['viewer','admin'].includes(this.authService.getRole())){

      this.auth = this.authService.getCurrentUser();
      this.perfil.usuario_rol = this.auth?.rol;

    }
  }
}
