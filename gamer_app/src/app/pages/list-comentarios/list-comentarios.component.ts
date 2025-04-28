import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { Router, RouterLink } from '@angular/router';
import { ComentarioService } from '../../services/comentario.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-list-comentarios',
  imports: [HeaderComponent, FooterComponent, CommonModule, FormsModule, NgxPaginationModule, RouterLink],
  templateUrl: './list-comentarios.component.html',
  styleUrl: './list-comentarios.component.css'
})
export class ListComentariosComponent {
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
    this.itemsPerPage = 5;
   

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

      if(['admin'].includes(this.authService.getRole())){
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
