import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import Usuario from '../../models/Usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private storageKey = 'users';
  private deletedKey = 'usuariosEliminados';
  private currentUserKey = 'currentUser';
  private usersJson: Usuario[] = [];
  public users$: BehaviorSubject<Usuario[]> = new BehaviorSubject<Usuario[]>([]);

  constructor(private http: HttpClient, private router: Router) {
    this.loadUsersFromJson();
    // localStorage.removeItem(this.storageKey); // Eliminar users guardados
    // localStorage.removeItem(this.deletedKey); // Eliminar el localStorage de los escondidos eliminados
    // localStorage.removeItem(this.currentUserKey);//Usuarios logueados
  }

  private loadUsersFromJson() {
    this.http.get<Usuario[]>('assets/json/usuarios.json').subscribe(data => {
      this.usersJson = data;
      this.updateUserList();
    });
  }

  private getStoredUsers(): Usuario[] {
    const stored = localStorage.getItem(this.storageKey);
    return stored ? JSON.parse(stored) : [];
  }

  private saveUsersToLocalStorage(users: Usuario[]): void {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(users));
    } catch (e) {
      if (e instanceof DOMException && e.name === 'QuotaExceededError') {
        alert('El límite de almacenamiento fue superado. Se han limpiado los datos de usuarios guardados.');
        localStorage.removeItem(this.storageKey); // quita todos los users creados en local storage, si el limite sobrepasa
        localStorage.removeItem(this.deletedKey);
        // No llamamos a updateUserList aquí para evitar bucles
      } else {
        throw e;
      }
    }
  }

  private getDeletedIds(): number[] {
    const eliminados = localStorage.getItem(this.deletedKey);
    return eliminados ? JSON.parse(eliminados) : [];
  }

  private saveDeletedIds(ids: number[]): void {
    localStorage.setItem(this.deletedKey, JSON.stringify(ids));
  }

  updateUserList(): void {
    const storedUsers = this.getStoredUsers();
    const deletedIds = this.getDeletedIds();
    const idsEnStorage = storedUsers.map(u => u.id);

    const filtrados = this.usersJson.filter(u =>
      !deletedIds.includes(u.id) && !idsEnStorage.includes(u.id)
    );

    const combined = [...filtrados, ...storedUsers];
    combined.sort((a, b) => a.id - b.id);

    this.users$.next(combined);
    this.saveUsersToLocalStorage(storedUsers);
  }

  register(rol: string, nombre: string, apellidos: string, username: string,
           email: string, celular: string, password: string, confirmarPassword: string, imagen: string): Observable<boolean> {

    const storedUsers = this.getStoredUsers();
    const allUsers = [...this.usersJson, ...storedUsers];

    if (allUsers.some(u => u.username === username)) {
      return of(false); // Usuario ya existe
    }

    const id = this.getTotalUsuarios();
    const newUser: Usuario = { id, rol, nombre, apellidos, username, email, celular, password, confirmarPassword, imagen };

    storedUsers.push(newUser);
    this.saveUsersToLocalStorage(storedUsers);
    this.updateUserList();
    return of(true);
  }

  agregarUsuario(usuario: Usuario) {
    const usuarios = this.getStoredUsers();
    usuarios.push(usuario);
    this.saveUsersToLocalStorage(usuarios);
    this.updateUserList();
  }

  actualizarUsuario(usuarioActualizado: Usuario): void {
    const users = this.getStoredUsers();
    const index = users.findIndex(u => u.id === usuarioActualizado.id);
  
    if (index !== -1) {
      users[index] = usuarioActualizado;
    } else {
      users.push(usuarioActualizado);
    }
  
    this.saveUsersToLocalStorage(users);
    localStorage.setItem(this.currentUserKey, JSON.stringify(usuarioActualizado)); // <-- ACTUALIZA currentUser
    this.updateUserList();
  }

  eliminarUsuario(id: number): void {
    const users = this.getStoredUsers().filter(u => u.id !== id);
    const deleted = this.getDeletedIds();

    if (!deleted.includes(id)) {
      deleted.push(id);
      this.saveDeletedIds(deleted);
    }

    this.saveUsersToLocalStorage(users);
    this.updateUserList();
  }

  /*restaurarUsuariosEliminados(): void {
    localStorage.removeItem(this.deletedKey);
    this.updateUserList();
  }*/

    getTotalUsuarios(): number {
      const allUsers = [...this.usersJson, ...this.getStoredUsers()];
      const deleted = this.getDeletedIds();
    
      const validUsers = allUsers.filter(u => !deleted.includes(u.id));
      const maxId = validUsers.length > 0 ? Math.max(...validUsers.map(u => u.id)) : 0;
    
      return maxId + 1;
    }
    

  login(username: string, password: string): boolean {
    const allUsers = [...this.usersJson, ...this.getStoredUsers()];
    const user = allUsers.find(u => u.username === username && u.password === password);

    if (user) {
      localStorage.setItem(this.currentUserKey, JSON.stringify(user));
      this.updateUserList();
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem(this.currentUserKey);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return localStorage.getItem(this.currentUserKey) !== null;
  }

  getCurrentUser(): Usuario | null {
    return JSON.parse(localStorage.getItem(this.currentUserKey) || '{}');
  }

  getRole(): string {
    const user = this.getCurrentUser();
    return user ? user.rol : '';
  }

  getFormattedDateTime(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }
}
