import { Component, Input } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ComentarioService } from '../../services/comentario.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import Comentario from '../../models/Comentario';

@Component({
  selector: 'app-comentario',
  imports: [HeaderComponent, FooterComponent, CommonModule, FormsModule, NgxPaginationModule, RouterLink],
  templateUrl: './comentario.component.html',
  styleUrl: './comentario.component.css'
})
export class ComentarioComponent {

  auth: any;
  page: number = 1;
  itemsPerPage: any;

  comentarios: any[] = [];
  nuevoComentario: string = '';

  auth_commit: any;
  commit_fecha: any;

  errorMessage: string = '';
  successMessage: string = '';

  constructor(public comentarioService: ComentarioService, public router: Router, public authService: AuthService){}
  

  ngOnInit(): void {

    //Accede a usuario logueado
    this.auth = this.authService.getRole();
    if(['admin'].includes(this.authService.getRole())){
      this.itemsPerPage = 5;
    }else{
      this.itemsPerPage = 3;
    }

    // Suscribirse al BehaviorSubject de usuarios
    this.authService.users$.subscribe(users => {
      // Obtener la lista de usuarios
      const usersList = users;

      // Suscribirse a los comentarios y asignar las imágenes
      this.comentarioService.comentarios$.subscribe(data => {
        this.comentarios = data;

        // Asignar la imagen de usuario a cada comentario
        this.comentarios.forEach(comentario => {
          const user = usersList.find(u => u.id === comentario.user_id); // Buscar el usuario por user_id
           // Verificar si se encontró el usuario y si su imagen es válida
           comentario.imagen = user && user.imagen ? user.imagen : 'assets/img/user.jpg'; // Imagen predeterminada
        });
        console.log("Comentarios Json ",this.comentarios);
      });
    });
  }

  redirectToLogin(){

    if(this.authService.isAuthenticated()){

      if(['viewer', 'admin'].includes(this.authService.getRole())){
        this.comentarioService.comentarios$.subscribe(data => {
          this.comentarios = data;
          console.log("Comentarios Json ",this.comentarios);
        });
      }
      // console.log("Usuario Autenticado",this.authService.isAuthenticated());
    }else{
      this.router.navigate(['/login']);
      //console.log("Usuario No Autenticado",this.authService.isAuthenticated());
    }
    
  }

  agregarComentario(): void {

    if(this.authService.isAuthenticated()){
      
      if (!this.nuevoComentario) {
        this.errorMessage = 'Debe agregar un comentario o reseña';
        return;
      }else{
        this.errorMessage = "";
      }

      if (this.nuevoComentario.trim() && ['viewer'].includes(this.authService.getRole())) {

        //Accede a usuario logueado
        this.auth_commit = this.authService.getCurrentUser();
        //Accede a fecha y hora actual
        this.commit_fecha = this.comentarioService.getFormattedDateTime();
       
        // // Si encontramos el comentario, asignamos el avatar correspondiente
        // let avatar = "../assets/img/user.jpg"; // Imagen predeterminada

        // if (this.auth_commit.imagen) {
        //   // Si el comentario existe, asignamos el avatar del comentario
        //   avatar = this.auth_commit.imagen;
        // }

        const nuevo = {
          id: (this.comentarios.length + 1).toString(),
          com_username: this.auth_commit?.username,
          com_descripcion: this.nuevoComentario,
          com_fecha: this.commit_fecha,
          user_id: this.auth_commit?.id // Añadir el user_id
        };
        // console.log("Nuevo comentario",nuevo);

        this.comentarioService.agregarComentario(nuevo);
        this.nuevoComentario = ''; // Limpiar el input
        
      }else if(['admin'].includes(this.authService.getRole())){
        console.log("Rol admin");
      }
   
    }else{
      this.router.navigate(['/login']);
      console.log("Usuario No Autenticado",this.authService.isAuthenticated());
    }
  }


  eliminarComentario(id: string): void {
    if(this.authService.isAuthenticated()){
      // Confirmación de eliminación
      const confirmDelete = window.confirm('¿Estás seguro de que quieres eliminar este comentario?');
      if (confirmDelete) {
        // Llamamos al servicio para eliminar el comentario
        this.comentarioService.eliminarComentario(id); 
        console.log('Comentario eliminado con éxito');
      }
    }else{
      console.log("Usuario No Autenticado",this.authService.isAuthenticated());
    }
  }
  
}
