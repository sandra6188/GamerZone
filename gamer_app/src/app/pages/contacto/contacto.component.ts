import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-contacto',
  imports: [HeaderComponent, FooterComponent, CommonModule],
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.css'
})
export class ContactoComponent {

  email_contacto:string = 'gamerzone@sitioincreible.com';

  constructor(public router: Router, public authService: AuthService){}
  
  redirectToLogin(){
    if(this.authService.isAuthenticated()){
      console.log("Usuario Autenticado",this.authService.isAuthenticated());
    }else{
      this.router.navigate(['/login']);
      console.log("Usuario No Autenticado",this.authService.isAuthenticated());
    }
  }
}
