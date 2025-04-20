import { Injectable } from '@angular/core';
import Contacto from '../models/Contacto';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactoService {

  /*contactos: Contacto[];

  constructor() {
    this.contactos = [];
  }*/
  private storageKey = 'contactos';
  private deletedKey = 'contactosEliminados';
  public contactos$: BehaviorSubject<Contacto[]> = new BehaviorSubject<Contacto[]>([]);
  public contactosJson: Contacto[] = [];

  constructor(private http: HttpClient) {
    this.loadContactosFromJson();
    this.loadStoredContacts();
  }

  private loadContactosFromJson() {
    this.http.get<Contacto[]>('assets/json/contactos.json').subscribe((jsonContactos) => {
      this.contactosJson = jsonContactos;
      this.updateContactList();
    });
  }

  loadStoredContacts() {
    this.updateContactList();
    // localStorage.removeItem(this.storageKey); // Eliminar comentarios guardados
    // localStorage.removeItem(this.deletedKey); // Eliminar el localStorage de los escondidos eliminados
  }

  getStoredContacts(): Contacto[] {
    const stored = localStorage.getItem(this.storageKey);
    return stored ? JSON.parse(stored) : [];
  }

  private saveToStorage(contactos: Contacto[]) {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(contactos));
      this.updateContactList();
    } catch (e) {
      if (e instanceof DOMException && e.name === 'QuotaExceededError') {
        alert('El límite de almacenamiento fue superado. Limpiando datos guardados.');
        localStorage.removeItem(this.storageKey);
        this.updateContactList();
      } else {
        throw e;
      }
    }
  }

  agregarContacto(contacto: Contacto) {
    const contactos = this.getStoredContacts();
    contactos.push(contacto);
    this.saveToStorage(contactos);
  }

  actualizarContacto(contactoActualizado: Contacto) {
    const contactos = this.getStoredContacts();
    const index = contactos.findIndex(c => c.contacto_id === contactoActualizado.contacto_id);

    if (index !== -1) {
      contactos[index] = contactoActualizado;
    } else {
      contactos.push(contactoActualizado);
    }

    this.saveToStorage(contactos);
  }

  eliminarContacto(id: number): void {
    const contactos = this.getStoredContacts();
    const nuevosContactos = contactos.filter(c => c.contacto_id !== id);
    this.saveToStorage(nuevosContactos);

    const idsEliminados = this.getDeletedIds();
    if (!idsEliminados.includes(id)) {
      idsEliminados.push(id);
      localStorage.setItem(this.deletedKey, JSON.stringify(idsEliminados));
    }

    this.updateContactList();
  }

  getDeletedIds(): number[] {
    const eliminados = localStorage.getItem(this.deletedKey);
    return eliminados ? JSON.parse(eliminados) : [];
  }

  restaurarContactosEliminados(): void {
    localStorage.removeItem(this.deletedKey);
    this.updateContactList();
  }

  updateContactList() {
    const storedContacts = this.getStoredContacts();
    const eliminados = this.getDeletedIds();
    const idsEnStorage = storedContacts.map(c => c.contacto_id);

    const contactosFiltrados = this.contactosJson.filter(c =>
      !eliminados.includes(c.contacto_id) && !idsEnStorage.includes(c.contacto_id)
    );

    const combinedContacts = [...contactosFiltrados, ...storedContacts];
    combinedContacts.sort((a, b) => a.contacto_id - b.contacto_id);

    this.contactos$.next(combinedContacts);

  }

  getTotalDatos(): number {
    const eliminados = this.getDeletedIds();
    const contactosJsonValidos = this.contactosJson.filter(c => !eliminados.includes(c.contacto_id));
    const contactosLocal = this.getStoredContacts();
    return contactosJsonValidos.length + contactosLocal.length + 1;
  }

  getFormattedDateTime = (): string => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };


  //TOMA LOS DATOS DEL JSON Y LOS GUARDAN EN EL LOCAL STORAGE
  // Cargar contactos desde JSON y LocalStorage
  /*private loadContactosFromJson() {
    this.http.get<any[]>('assets/json/contactos.json').subscribe((jsonContactos) => {
      if (!localStorage.getItem(this.storageKey)) { // Solo carga si no existe en localStorage
        localStorage.setItem(this.storageKey, JSON.stringify(jsonContactos));
        this.contactos$.next(jsonContactos);
      }
    });
  }
  // Obtener contactos desde localStorage
  public getStoredContacts(): any[] {
    const stored = localStorage.getItem(this.storageKey);
    return stored ? JSON.parse(stored) : [];
  }

  // Agregar un nuevo contacto
  agregarContacto(contacto: any) {
    const contactos = this.getStoredContacts();
    contactos.push(contacto); // Agregar al final de la lista
    localStorage.setItem(this.storageKey, JSON.stringify(contactos));
    this.contactos$.next(contactos);
  }*/

  
  
} 
