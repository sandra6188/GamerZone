import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SobreNosotrosService } from '../../services/sobre-nosotros.service';

@Component({
  selector: 'app-sobrenosotros',
  imports: [HeaderComponent, FooterComponent, CommonModule, FormsModule],
  templateUrl: './sobrenosotros.component.html',
  styleUrl: './sobrenosotros.component.css'
})
export class SobrenosotrosComponent {

  @ViewChild('inputImagen') inputImagenRef!: ElementRef<HTMLInputElement>;
  descripcion: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  imagenSeleccionada: string = '';

  constructor(
    public router: Router, 
    public authService: AuthService,
    private sobreNosotrosService: SobreNosotrosService
  ) {}

  ngOnInit(): void {
    if (this.authService.isAuthenticated() && ['viewer','admin'].includes(this.authService.getRole())) {
      this.descripcion = this.sobreNosotrosService.getDescripcion(); // Carga la actual
      // Carga la actual
      this.sobreNosotrosService.imagen$.subscribe(img => {
        this.imagenSeleccionada = img;
      });
    }
  }

  redirectToLogin() {
    if (!this.descripcion.trim()) {
      this.errorMessage = 'La descripción no puede estar vacía.';
      return;
    }
  
    // Otras validaciones de perfil, si siguen aplicando...
    this.sobreNosotrosService.setDescripcion(this.descripcion);
    this.successMessage = 'Descripción actualizada exitosamente.';
  }

  onImagenSeleccionada(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const archivo = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        const imgBase64 = reader.result as string;
        this.imagenSeleccionada = imgBase64;
        this.sobreNosotrosService.setImagen(imgBase64); // Guarda en localStorage y emite
      };

      reader.readAsDataURL(archivo);
    }
  }
  
  abrirSelectorImagen() {
    this.inputImagenRef.nativeElement.click();
  }
}
