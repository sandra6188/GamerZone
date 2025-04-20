import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { FormsModule } from '@angular/forms';
import { ContactoService } from '../../services/contacto.service';

@Component({
  selector: 'app-contacto',
  imports: [HeaderComponent, FooterComponent, CommonModule, FormsModule],
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.css'
})
export class ContactoComponent {

  email_dc:string = 'gamerzone@sitioincreible.com';
  auth_contact: any;
  private id_maximo: any;

  nuevoContacto = { 
    contacto_id: 0,
    contacto_asunto: '', 
    contacto_nombrecompleto: '', 
    contacto_email: '',
    contacto_telefono: '',
    contacto_comentario: '',
    contacto_fecha: new Date(),
    user_id: 0
  };

  errorMessage: string = '';
  contactos: any[] = [];
  mensajeExito: string = '';

  constructor(public router: Router, public authService: AuthService, public contactoService: ContactoService){}

  ngOnInit(): void {
    if(this.authService.isAuthenticated() && this.authService.getRole() == 'viewer'){

      this.auth_contact = this.authService.getCurrentUser();
      this.nuevoContacto.contacto_nombrecompleto = this.auth_contact?.nombre +" "+ this.auth_contact?.apellidos;
      this.nuevoContacto.contacto_email = this.auth_contact?.email;
      this.nuevoContacto.contacto_telefono = this.auth_contact?.celular;

    }else if(this.authService.isAuthenticated() && this.authService.getRole() == 'admin'){

      // Suscribirse a los contactos para obtener actualizaciones en tiempo real
      this.contactoService.contactos$.subscribe((contactos) => {
        this.contactos = contactos;
      });

    }
  }
  
  redirectToLogin(){
    if(this.authService.isAuthenticated()){

      if(this.authService.getRole() == 'viewer'){

        if (!this.nuevoContacto.contacto_asunto || 
          !this.nuevoContacto.contacto_nombrecompleto || 
          !this.nuevoContacto.contacto_email || 
          !this.nuevoContacto.contacto_telefono || 
          !this.nuevoContacto.contacto_comentario) {

          this.errorMessage = 'Todos los campos son obligatorios.';
          return;

        }else{
          this.errorMessage = '';
        }

        //Accede a usuario logueado
        this.auth_contact = this.authService.getCurrentUser();
        //Accede a los datos de localstored
        this.id_maximo = this.contactoService.getTotalDatos();
      
        //Accede a fecha y hora actual
        this.nuevoContacto.contacto_fecha = new Date(this.contactoService.getFormattedDateTime().replace(' ', 'T'));

        // console.log("Contactos id_maximo ", this.id_maximo);

        this.nuevoContacto = {
          contacto_id: this.id_maximo,
          contacto_asunto: this.nuevoContacto.contacto_asunto,
          contacto_nombrecompleto: this.nuevoContacto.contacto_nombrecompleto,
          contacto_email: this.nuevoContacto.contacto_email,
          contacto_telefono: this.nuevoContacto.contacto_telefono,
          contacto_comentario: this.nuevoContacto.contacto_comentario,
          contacto_fecha: this.nuevoContacto.contacto_fecha,
          user_id: this.auth_contact?.id,
        };

        console.log("Nuevo comentario", this.nuevoContacto);

        this.contactoService.agregarContacto({ ...this.nuevoContacto }); // Agregar contacto
        
        this.mensajeExito = "Se ha enviado su solicitud correctamente, te daremos respuesta lo pronto posible :)";
       
        this.nuevoContacto = {     
          contacto_id: 0,
          contacto_asunto: '',
          contacto_nombrecompleto: this.nuevoContacto.contacto_nombrecompleto,
          contacto_email: this.nuevoContacto.contacto_email,
          contacto_telefono: this.nuevoContacto.contacto_telefono,
          contacto_comentario: '',
          contacto_fecha: new Date(),
          user_id: 0,
        }; // Limpiar formulario

        //Ocultar el mensaje después de unos segundos (opcional)
        setTimeout(() => {
          this.mensajeExito = '';
        }, 5000); // El mensaje desaparecerá después de 5 segundos
              
      }
      // console.log("Usuario Autenticado",this.authService.isAuthenticated());
    }else{
      this.router.navigate(['/login']);
      // console.log("Usuario No Autenticado",this.authService.isAuthenticated());
    }
  }
}
