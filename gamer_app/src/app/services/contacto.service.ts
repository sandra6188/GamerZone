import { Injectable } from '@angular/core';
import Contacto from '../models/Contacto';

@Injectable({
  providedIn: 'root'
})
export class ContactoService {

  contactos: Contacto[];

  constructor() {
    this.contactos = [];
  }
} 
