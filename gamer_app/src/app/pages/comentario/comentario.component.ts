import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ComentarioService } from '../../services/comentario.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-comentario',
  imports: [HeaderComponent, FooterComponent, CommonModule, FormsModule, NgxPaginationModule],
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

    this.comentarioService.comentarios$.subscribe(data => {
      this.comentarios = data;
      //console.log("Comentarios Json ",this.comentarios);
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

  agregarComentario() {

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

        const nuevo = {
          id: (this.comentarios.length + 1).toString(),
          com_username: this.auth_commit?.username,
          com_descripcion: this.nuevoComentario,
          com_avatar: "../assets/img/user.jpg",
          com_fecha: this.commit_fecha
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

  
}
