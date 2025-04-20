import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductoService } from '../../services/producto.service';
import { AuthService } from '../../services/auth/auth.service';
import Producto from '../../models/Producto';

@Component({
  selector: 'app-detail-addcarrito',
  imports: [HeaderComponent, FooterComponent, CommonModule, FormsModule, RouterLink],
  templateUrl: './detail-addcarrito.component.html',
  styleUrl: './detail-addcarrito.component.css'
})

export class DetailAddcarritoComponent {

  /*Nota lo comentado no se esta utilizando ya que esto es visual para el rol viewer */
  
  // producto = Input<Producto>
  @Input() producto!: Producto; //De padre a hijo
  //@ViewChild('inputImagen') inputImagenRef!: ElementRef<HTMLInputElement>; // para acceder al input file y usado para interactuar con el input de archivo desde el código TypeScript.

  auth: any;
  errorMessage: string = '';
  successMessage: string = '';

   imagenPreview: string | null = null;
  // nuevaImagenBase64: string | null = null;

  
  constructor(public router: Router, private authService: AuthService, private  route: ActivatedRoute, private productoService: ProductoService){}


  ngOnInit(): void {

    
    const idParam = this.route.snapshot.paramMap.get('id');

    if (!idParam) {
      // Formulario vacio para indicar uno nuevo
      this.producto = {
        id: 0, // luego generamos un ID único en el servicio
        titulo: '',
        descripcion: '',
        genero: '',
        imagen: ''
      };
      return;
    }
  
    const id = Number(idParam);

    this.productoService.productos$.subscribe(productos => {
      const encontrado = productos.find(p => p.id === id);
      if (encontrado) {
        this.producto = encontrado;
        this.imagenPreview = this.producto.imagen ?? null;
      } else {
        console.log("Producto no encontrado");
      }

    });

  }

  redirectToLogin(){
    if(this.authService.isAuthenticated()){
      if(['viewer'].includes(this.authService.getRole())){

      }/*else if(['admin'].includes(this.authService.getRole())){
        if (this.producto.id && this.producto.id !== 0) {
          this.actualizarProducto();
        } else {
          this.registrarProducto();
        }
      }*/
    }else{
      console.log("Usuario No Autenticado",this.authService.isAuthenticated());
    }
  }

  /*actualizarProducto(): void {
    
    if (!this.validarCampos()) return;

    if (!this.producto || !this.producto.id) {
      this.errorMessage = 'Producto inválido';
      return;
    }

    if (this.nuevaImagenBase64) {
      this.producto.imagen = this.nuevaImagenBase64;
    }
  
    try {
      this.productoService.actualizarProducto(this.producto);
      this.successMessage = 'Producto actualizado correctamente';
      this.errorMessage = '';
    } catch (error) {
      this.errorMessage = 'Error al actualizar el producto';
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

  registrarProducto(): void {

    if (!this.validarCampos()) return;

    if (this.nuevaImagenBase64) {
      this.producto.imagen = this.nuevaImagenBase64;
    } else {
      this.producto.imagen = 'assets/img/sin_img.png'; // Imagen por defecto
    }
  
    // Accede al total de json y localstorage
    this.producto.id = this.productoService.getTotalDatos();
  
    try {
      this.productoService.agregarProducto(this.producto);
      this.successMessage = 'Producto registrado correctamente';
      this.errorMessage = '';
    } catch (error) {
      this.errorMessage = 'Error al registrar el producto';
      this.successMessage = '';
      console.error(error);
    }
  }

  validarCampos(): boolean {
    if (
      !this.producto.titulo?.trim() ||
      !this.producto.descripcion?.trim() ||
      !this.producto.genero?.trim()
    ) {
      this.errorMessage = 'Faltan campos por diligenciar';
      this.successMessage = '';
      return false;
    }
  
    return true;
  }*/
}
