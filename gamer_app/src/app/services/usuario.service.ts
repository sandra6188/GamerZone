import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import Usuario from '../models/Usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private storageKey = 'usuarios';
  private deletedKey = 'usuariosEliminados';
  public usuarios$: BehaviorSubject<Usuario[]> = new BehaviorSubject<Usuario[]>([]);
  public usuariosJson: Usuario[] = [];

  constructor(private http: HttpClient) {
    this.loadUsuariosFromJson();
    this.loadStoredUsuarios();
  
  }

  private loadUsuariosFromJson() {
    this.http.get<Usuario[]>('assets/json/usuarios.json').subscribe((jsonUsuarios) => {
      this.usuariosJson = jsonUsuarios;
      this.updateUserList();
    });
  }

  loadStoredUsuarios() {
    this.updateUserList();
  }

  getStoredUsuarios(): Usuario[] {
    const stored = localStorage.getItem(this.storageKey);
    console.log("SE REVISAAA ",stored);
    return stored ? JSON.parse(stored) : [];
  }

  private saveToStorage(usuarios: Usuario[]) {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(usuarios));
      this.updateUserList();
    } catch (e) {
      if (e instanceof DOMException && e.name === 'QuotaExceededError') {
        alert('Límite de almacenamiento superado. Limpiando datos guardados.');
        localStorage.removeItem(this.storageKey);
        this.updateUserList();
      } else {
        throw e;
      }
    }
  }

  agregarUsuario(usuario: Usuario) {
    const usuarios = this.getStoredUsuarios();
    usuarios.push(usuario);
    this.saveToStorage(usuarios);
  }

  actualizarUsuario(usuarioActualizado: Usuario) {
    const usuarios = this.getStoredUsuarios();
    const index = usuarios.findIndex(u => u.id === usuarioActualizado.id);

    if (index !== -1) {
      usuarios[index] = usuarioActualizado;
    } else {
      usuarios.push(usuarioActualizado);
    }

    this.saveToStorage(usuarios);
  }

  eliminarUsuario(id: number): void {
    const usuarios = this.getStoredUsuarios();
    const nuevosUsuarios = usuarios.filter(u => u.id !== id);
    this.saveToStorage(nuevosUsuarios);

    const idsEliminados = this.getDeletedIds();
    if (!idsEliminados.includes(id)) {
      idsEliminados.push(id);
      localStorage.setItem(this.deletedKey, JSON.stringify(idsEliminados));
    }

    this.updateUserList();
  }

  getDeletedIds(): number[] {
    const eliminados = localStorage.getItem(this.deletedKey);
    return eliminados ? JSON.parse(eliminados) : [];
  }

  restaurarUsuariosEliminados(): void {
    localStorage.removeItem(this.deletedKey);
    this.updateUserList();
  }

  updateUserList() {
    const storedUsuarios = this.getStoredUsuarios();
    const eliminados = this.getDeletedIds();
    const idsEnStorage = storedUsuarios.map(u => u.id);
  
    const usuariosFiltrados = this.usuariosJson
      ? this.usuariosJson.filter(u =>
          !eliminados.includes(u.id) && !idsEnStorage.includes(u.id)
        )
      : [];
  
    const combinedUsuarios = [...usuariosFiltrados, ...storedUsuarios];
    combinedUsuarios.sort((a, b) => a.id - b.id);
  
    this.usuarios$.next(combinedUsuarios);
  }

  getTotalUsuarios(): number {
    const eliminados = this.getDeletedIds();
    const usuariosJsonValidos = this.usuariosJson.filter(u => !eliminados.includes(u.id));
    const usuariosLocal = this.getStoredUsuarios();
    return usuariosJsonValidos.length + usuariosLocal.length + 1;
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
