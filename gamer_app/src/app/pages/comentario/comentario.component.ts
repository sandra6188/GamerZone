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

  page: number = 1;

  comentarios: any[] = [];
  nuevoComentario: string = '';

  constructor(public comentarioService: ComentarioService, public router: Router, public authService: AuthService){}
  

  ngOnInit(): void {
    this.comentarioService.comentarios$.subscribe(data => {
      this.comentarios = data;
      console.log("Comentarios Json ",this.comentarios);
    });
  }

  redirectToLogin(){
    if(this.authService.isAuthenticated()){
      if(this.authService.getRole() == 'viewer'){
        this.comentarioService.comentarios$.subscribe(data => {
          this.comentarios = data;
          console.log("Comentarios Json ",this.comentarios);
        });
      }
      // console.log("Usuario Autenticado",this.authService.isAuthenticated());
    }else{
      this.router.navigate(['/login']);
      console.log("Usuario No Autenticado",this.authService.isAuthenticated());
    }
    
  }

  // agregarComentario(): void {
  //   if (this.nuevoComentario.trim() === '') return;

  //   const nuevo = {
  //     id: (this.comentarios.length + 1).toString(),
  //     com_username: "Usuario",
  //     com_descripcion: this.nuevoComentario,
  //     com_fecha: new Date().toISOString()
  //   };
  //   console.log("Nuevo comentario",nuevo);

  //   this.comentarioService.agregarComentario(nuevo);
  //   this.comentarios.unshift(nuevo); // Refresca la lista en tiempo real
  //   this.nuevoComentario = '';
  // }

  agregarComentario() {
    if(this.authService.isAuthenticated()){
      if (this.nuevoComentario.trim()) {
        const nuevo = {
          id: (this.comentarios.length + 1).toString(),
          com_username: 'UsuarioTest',
          com_descripcion: this.nuevoComentario,
          com_avatar: "https://randomuser.me/api/portraits/men/1.jpg",
          com_fecha: '2025-01-01 10:00:00'//new Date().toLocaleString()
        };
        console.log("Nuevo comentario",nuevo);

        this.comentarioService.agregarComentario(nuevo);
        this.nuevoComentario = ''; // Limpiar el input
      }
    }else{
      this.router.navigate(['/login']);
      console.log("Usuario No Autenticado",this.authService.isAuthenticated());
    }
  }

  
}
