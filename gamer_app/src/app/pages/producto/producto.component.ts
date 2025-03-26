import { Component } from '@angular/core';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';
import { ProductoService } from '../../services/producto.service';
import { ProductoCardComponent } from '../../components/producto-card/producto-card.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-producto',
  imports: [HeaderComponent,FooterComponent, ProductoCardComponent, CommonModule, NgxPaginationModule],
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.css'
})
export class ProductoComponent {
  constructor(public productoService: ProductoService){

  }
  page: number = 1;
}
