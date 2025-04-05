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
  public contactos$: BehaviorSubject<Contacto[]> = new BehaviorSubject<Contacto[]>([]);
  public contactosJson: Contacto[] = []; // Contactos desde el JSON

  constructor(private http: HttpClient) { 
    this.loadContactosFromJson();
    this.loadStoredContacts();
  }

  // Cargar contactos desde JSON (sin guardarlos en localStorage)
  private loadContactosFromJson() {
    this.http.get<Contacto[]>('assets/json/contactos.json').subscribe((jsonContactos) => {
      this.contactosJson = jsonContactos; // Guardar los del JSON en una variable
      this.updateContactList(); // Actualizar la lista con JSON + LocalStorage
    });
  }

  // Cargar contactos desde localStorage
  loadStoredContacts() {
    this.updateContactList();
    localStorage.removeItem(this.storageKey); // Eliminar contactos guardados
  }

  // Obtener contactos desde localStorage
  getStoredContacts(): Contacto[] {
    const stored = localStorage.getItem(this.storageKey);
    return stored ? JSON.parse(stored) : [];
  }

  // Agregar un nuevo contacto solo en localStorage
  agregarContacto(contacto: Contacto) {
    const contactos = this.getStoredContacts();
    contactos.push(contacto);
    localStorage.setItem(this.storageKey, JSON.stringify(contactos));
    this.updateContactList();
  }

  // Actualizar la lista combinando los contactos del JSON y localStorage
  updateContactList() {
    const storedContacts = this.getStoredContacts();
    const combinedContacts = [...this.contactosJson, ...storedContacts];
    this.contactos$.next(combinedContacts);

    console.log("Contactos cargados en Json y LocalStorage", combinedContacts);
  }

  //Saca el total de datos entre Json y Localstorage
  getTotalDatos(){
    // console.log("Contactos cargados en Json", this.contactosJson.length);
    // console.log("Contactos cargados en LocalStorage", this.getStoredContacts().length);
    var id_maximo = (this.contactosJson.length + this.getStoredContacts().length) + 1;
    return id_maximo;   
  }

  //Para traerme la fecha y hora actual
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
