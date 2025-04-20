import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { SobreNosotrosService } from '../../services/sobre-nosotros.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  showBackground = true; // Controla cuándo se muestra el fondo

  descripcion: string = '';
  imagenSobreNosotros: string = '';

  constructor(private sobreNosotrosService: SobreNosotrosService) {}

  ngOnInit() {
    this.sobreNosotrosService.descripcion$.subscribe(texto => {
      this.descripcion = texto;
    });

    this.sobreNosotrosService.imagen$.subscribe(imagen => {
      this.imagenSobreNosotros = imagen;
    });
  }
}
