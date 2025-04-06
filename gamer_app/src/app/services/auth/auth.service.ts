import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn = false;
  private currentUser: any = null;
  private users: any[] = [];

  constructor(private http:HttpClient, private router: Router) { 
    this.loadUsersFromJson();
  }

  // Cargar usuarios desde el JSON
  private loadUsersFromJson() {
    this.http.get<any[]>('assets/json/usuarios.json').subscribe(data => {
      this.users = data;
      console.log('Usuarios cargados en Json:', this.users);
    });
    //localStorage.clear();// (Opcional) Borra todo el localStorage si es necesario
    // localStorage.removeItem('users'); // (Opcional) borra los datos del users nomas 
    console.log('Usuarios cargados en localStorage:', localStorage);
  }

  // Registrar un nuevo usuario como "viewer"
  register(
    rol:string, 
    nombre:string,
    apellidos:string, 
    username: string,
    email:string, 
    celular:string, 
    password: string,
    confirmarPassword:string): Observable<boolean> {
      
    let localUsers = JSON.parse(localStorage.getItem('users') || '[]');

    if ([...this.users, ...localUsers].some((u: any) => u.username === username)) {
      return of(false); // Usuario ya existe
    }

    var id_maximo = (this.users.length + localUsers.length) + 1;
    console.log('Cantidad Usurios Json:', this.users.length);
    console.log('Número de usuarios en localStorage:', localUsers.length);
    console.log('id Maximo', id_maximo);


    const newUser = { id: id_maximo, 
                      rol, 
                      nombre,
                      apellidos, 
                      username,
                      email, 
                      celular, 
                      password,
                      confirmarPassword 
                    };

    localUsers.push(newUser);
    localStorage.setItem('users', JSON.stringify(localUsers));
    return of(true);
  }


  // Iniciar sesión
  login(username: string, password: string): boolean {
    let localUsers = JSON.parse(localStorage.getItem('users') || '[]');
    let allUsers = [...this.users, ...localUsers];

    const user = allUsers.find((u: any) => u.username === username && u.password === password);

    if (user) {
      this.isLoggedIn = true;
      this.currentUser = user;
      localStorage.setItem('currentUser', JSON.stringify(user));
      return true;
    }
   
    return false;
  }

  // Cerrar sesión
  logout() {
    this.isLoggedIn = false;
    this.currentUser = null;
    localStorage.removeItem('currentUser');
    //localStorage.clear();// (Opcional) Borra todo el localStorage si es necesario
    console.log(localStorage); // ver lo que se llena en memoria con los datos
    this.router.navigate(['/login']);
  }

  // Verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    return this.isLoggedIn || localStorage.getItem('currentUser') !== null;
  }

  //Saca el usuario que inicio sesion
  getCurrentUser(): any {
    return this.currentUser || JSON.parse(localStorage.getItem('currentUser') ?? '{}');
  }

  // Obtener el rol del usuario
  getRole(): string {
    let user = this.currentUser || JSON.parse(localStorage.getItem('currentUser') ?? '{}');
    return user ? user.rol : '';
  }

}
