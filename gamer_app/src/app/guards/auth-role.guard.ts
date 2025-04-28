import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    // const requiredRole = route.data['role']; // Obtén el rol requerido desde los datos de la ruta
    if (['admin'].includes(this.authService.getRole())/*&& this.authService.hasRole(requiredRole)*/) {
      return true; 
    } else {
      alert("No puede acceder a esta ruta por falta ded permisos");
      this.router.navigate(['/']); 
      return false;
    }
  }
}
