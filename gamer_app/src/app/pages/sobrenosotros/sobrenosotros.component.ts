import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-sobrenosotros',
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './sobrenosotros.component.html',
  styleUrl: './sobrenosotros.component.css'
})
export class SobrenosotrosComponent {
  constructor(public router: Router, public authService: AuthService){}
}
