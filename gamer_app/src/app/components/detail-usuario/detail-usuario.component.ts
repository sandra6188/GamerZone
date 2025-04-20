import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Usuario from '../../models/Usuario';
import { NgIf } from '@angular/common';
import { ContactoService } from '../../services/contacto.service';

@Component({
  selector: 'app-detail-usuario',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CommonModule, FormsModule, RouterLink, NgIf],
  templateUrl: './detail-usuario.component.html',
  styleUrl: './detail-usuario.component.css'
})
export class DetailUsuarioComponent {

  @Input() usuario!: Usuario;
  @ViewChild('inputImagen') inputImagenRef!: ElementRef<HTMLInputElement>;

  errorMessage: string = '';
  successMessage: string = '';
  imagenPreview: string | null = null;
  nuevaImagenBase64: string | null = null;

  asunto: string = '';
  asuntoComentario: string = '';

  isEditMode: boolean = false;  // Establecemos que por defecto estamos en registro

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private contactoService: ContactoService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');

    if (!idParam) {
      this.usuario = {
        id: 0,
        rol: '',
        nombre: '',
        apellidos: '',
        username: '',
        email: '',
        celular: '',
        password: '',
        confirmarPassword: '',
        imagen: ''
      };
      return;
    }

    const id = Number(idParam);

    if (id > 0) {
      this.isEditMode = true;
    }

    this.authService.users$.subscribe(usuarios => {

      const encontrado = usuarios.find(p => p.id === id);

      if (encontrado) {
        this.usuario = encontrado;
        this.imagenPreview = this.usuario.imagen ?? null;

        this.contactoService.contactos$.subscribe(contactos => {

          const contactoRelacionado = contactos.find(c => c.user_id === this.usuario.id);

          if (contactoRelacionado) {
            this.asunto = contactoRelacionado.contacto_asunto;
            this.asuntoComentario = contactoRelacionado.contacto_comentario;
          }
          
        });

      } else {
        console.log("Usuario no encontrado");
      }

    });

  }

  redirectToLogin(): void {
    if (this.authService.isAuthenticated()) {
      if (['viewer'].includes(this.authService.getRole())) {
        return;
      }

      if (['admin'].includes(this.authService.getRole())) {
        if (this.usuario.id && this.usuario.id !== 0) {
          this.actualizarUsuario();
        } else {
          this.registrarUsuario();
        }
      }
    } else {
      console.log("Usuario No Autenticado", this.authService.isAuthenticated());
    }
  }

  actualizarUsuario(): void {
    if (!this.validarCampos()) return;

    if (!this.usuario || !this.usuario.id) {
      this.errorMessage = 'Usuario inválido';
      return;
    }

    if (this.nuevaImagenBase64) {
      this.usuario.imagen = this.nuevaImagenBase64;
    } else {
      this.usuario.imagen = 'assets/img/user.jpg';
    }

    try {
      this.authService.actualizarUsuario(this.usuario);
      this.successMessage = 'Usuario actualizado correctamente';
      this.errorMessage = '';
    } catch (error) {
      this.errorMessage = 'Error al actualizar el usuario';
      this.successMessage = '';
      console.error(error);
    }
  }

  registrarUsuario(): void {

    if (!this.validarCampos()) return;

    if (this.nuevaImagenBase64) {
      this.usuario.imagen = this.nuevaImagenBase64;
    } else {
      this.usuario.imagen = 'assets/img/user.jpg';
    }

    this.usuario.id = this.authService.getTotalUsuarios();

    try {
      this.authService.agregarUsuario(this.usuario);
      this.successMessage = 'Usuario registrado correctamente';
      this.errorMessage = '';
    } catch (error) {
      this.errorMessage = 'Error al registrar el usuario';
      this.successMessage = '';
      console.error(error);
    }
  }

  abrirInputImagen(): void {
    this.inputImagenRef.nativeElement.click();
  }

  onImagenSeleccionada(event: any): void {

    const file = event.target.files[0];
    if (file) {
      if (file.size > 1000 * 1000) {
        this.errorMessage = 'La imagen es demasiado grande (máx. 100KB)';
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        this.nuevaImagenBase64 = reader.result as string;
        this.imagenPreview = this.nuevaImagenBase64;
      };
      reader.readAsDataURL(file);
    }
  }

  validarCampos(): boolean {
    if (
      !this.usuario.nombre?.trim() ||
      !this.usuario.apellidos?.trim() ||
      !this.usuario.username?.trim() ||
      !this.usuario.email?.trim() ||
      !this.usuario.celular?.trim() ||
      !this.usuario.rol?.trim() ||
      !this.usuario.password?.trim() ||
      this.usuario.password !== this.usuario.confirmarPassword
    ) {
      this.errorMessage = 'Faltan campos o las contraseñas no coinciden';
      this.successMessage = '';
      return false;
    }

    return true;
  }
}
