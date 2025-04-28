import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthSinChildGuard  implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    
    // Verifica si el usuario está autenticado
    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      // Si no está autenticado, redirige a la página de login
      this.router.navigate(['/login']);
      return false;
    }
  }
}
