import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ComentarioService } from '../../services/comentario.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Comentario from '../../models/Comentario';

@Component({
  selector: 'app-detail-comentario',
  imports: [HeaderComponent, FooterComponent, CommonModule, FormsModule, RouterLink],
  templateUrl: './detail-comentario.component.html',
  styleUrl: './detail-comentario.component.css'
})
export class DetailComentarioComponent {

  @Input() comentario!: Comentario;
  @ViewChild('inputImagen') inputImagenRef!: ElementRef<HTMLInputElement>; // para acceder al input file y usado para interactuar con el input de archivo desde el código TypeScript.
 
  auth: any;

  errorMessage: string = '';
  successMessage: string = '';

  imagenPreview: string | null = null;
  nuevaImagenBase64: string | null = null;

  formatofecha = new Date();
  usuarioComentario: any = null;

  constructor(
    public router: Router,
    private authService: AuthService,
    private route: ActivatedRoute,
    private comentarioService: ComentarioService
  ) {}

  ngOnInit(): void {

    this.auth = this.authService.getRole();// con esto no tengo problemas al regresar

    const idParam = this.route.snapshot.paramMap.get('id');

    if (!idParam) {
      // Comentario nuevo
      this.comentario = {
        id: '',
        com_username: '',
        com_descripcion: '',
        com_fecha: '',
        user_id: 0,
      };
      return;
    }

    const id = Number(idParam);

    this.comentarioService.comentarios$.subscribe(comentarios => {
      const encontrado = comentarios.find(c => Number(c.id) === id);
      if (encontrado) {
        this.comentario = encontrado;

        // Buscar el usuario por user_id
        this.authService.users$.subscribe(users => {
          const usuario = users.find(u => u.id === this.comentario.user_id);
          this.usuarioComentario = usuario;

          // Mostrar la imagen actual (o una por defecto)
          this.imagenPreview = usuario?.imagen || 'assets/img/user.jpg';
        });
       // this.imagenPreview = this.comentario.com_avatar ?? null;

      } else {
        console.log("Comentario no encontrado");
      }
    });

  }

  redirectToLogin() {
    if (this.authService.isAuthenticated()) {
      if (['viewer'].includes(this.authService.getRole())) {
        // No se permite editar
      } else if (['admin'].includes(this.authService.getRole())) {
        if (this.comentario.id && this.comentario.id !== '') {
          this.actualizarComentario();
        }/* else {
          this.registrarComentario();
        }*/
      }
    } else {
      console.log("Usuario No Autenticado", this.authService.isAuthenticated());
    }
  }

  actualizarComentario(): void {

    if (!this.validarCampos()) return;

    if (!this.comentario || !this.comentario.id) {
      this.errorMessage = 'Comentario inválido';
      return;
    }

    if (this.nuevaImagenBase64 && this.usuarioComentario) {
      this.usuarioComentario.imagen = this.nuevaImagenBase64;
      this.authService.actualizarUsuario(this.usuarioComentario);
    }

    try {
      this.comentarioService.actualizarComentario(this.comentario);
      this.successMessage = 'Comentario actualizado correctamente';
      this.errorMessage = '';
    } catch (error) {
      this.errorMessage = 'Error al actualizar el comentario';
      this.successMessage = '';
      console.error(error);
    }
  }

  abrirInputImagen(): void {
    this.inputImagenRef.nativeElement.click();
  }

  // Manejo de selección de imagen
  onImagenSeleccionada(event: any): void {
    const file = event.target.files[0];
    if (file) {
      //Validar tamaño de la imagen
      if (file.size > 1000 * 1000) {
        this.errorMessage = 'La imagen es demasiado grande (máx. 100KB)';
        return;
      }

      const reader = new FileReader(); //Para leer el archivo de imagen y convertirlo a base64.
      reader.onload = () => {
        this.nuevaImagenBase64 = reader.result as string;
        this.imagenPreview = this.nuevaImagenBase64; // Mostrar preview
      };
      reader.readAsDataURL(file);
    }
  }

  //Esta funcion no esta para llamar se la dejo por si las moscas
  registrarComentario(): void {

    if (!this.validarCampos()) return;

    if (this.nuevaImagenBase64) {
    //  this.comentario.com_avatar = this.nuevaImagenBase64;
    } else {
    //  this.comentario.com_avatar = 'assets/img/user.jpg'; // Imagen por defecto
    }

    // Accede al total de json y localstorage
    this.comentario.id = String(this.comentarioService.getTotalDatos());
    this.comentario.com_fecha = this.comentarioService.getFormattedDateTime(); //Accede a fecha y hora actual

    try {
      this.comentarioService.agregarComentario(this.comentario);
      this.successMessage = 'Comentario registrado correctamente';
      this.errorMessage = '';
    } catch (error) {
      this.errorMessage = 'Error al registrar el comentario';
      this.successMessage = '';
      console.error(error);
    }
  }

  validarCampos(): boolean {
    if (
      !this.comentario.com_username?.trim() ||
      !this.comentario.com_descripcion?.trim() ||
      !this.comentario.com_fecha?.trim() 
    ) {
      this.errorMessage = 'Faltan campos por diligenciar';
      this.successMessage = '';
      return false;
    }

    return true;
  }

  regresarListar() {
    console.log("dentra aquiii", this.authService.getRole());
    if (this.authService.isAuthenticated() && ['admin'].includes(this.authService.getRole())) {
      this.router.navigate(['/comentarios']);
    }
  }
}
