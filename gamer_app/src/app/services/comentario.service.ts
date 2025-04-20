import { Injectable } from '@angular/core';
import Comentario from '../models/Comentario';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {
  
  //Manea de tarerlos quemados
  /* comentarios: Comentario[];
  constructor() {
    this.comentarios = [
      {
        id: "1",
        com_username: "JuanGamer",
        com_descripcion: "Este juego es increíble, lo recomiendo totalmente.",
        com_avatar: "https://randomuser.me/api/portraits/men/1.jpg",
        com_fecha: new Date("2025-03-24 14:30:15")
      },
      {
        id: "2",
        com_username: "AnaPlay",
        com_descripcion: "No me convenció mucho la jugabilidad, pero la historia es buena.",
        com_avatar: "https://randomuser.me/api/portraits/women/2.jpg",
        com_fecha: new Date("2025-03-23 18:45:00")
      },
      {
        id: "3",
        com_username: "PedroXP",
        com_descripcion: "Los gráficos son impresionantes, pero el rendimiento puede mejorar.",
        com_avatar: "https://randomuser.me/api/portraits/men/3.jpg",
        com_fecha: new Date("2025-03-22 21:10:30")
      },
      {
        id: "4",
        com_username: "LunaGamer",
        com_descripcion: "Me encantó la banda sonora, súper inmersiva.",
        com_avatar: "https://randomuser.me/api/portraits/women/4.jpg",
        com_fecha: new Date("2025-03-21 09:25:45")
      },
      {
        id: "5",
        com_username: "CarlosVR",
        com_descripcion: "Uno de los mejores juegos que he jugado este año.",
        com_avatar: "https://randomuser.me/api/portraits/men/5.jpg",
        com_fecha: new Date("2025-03-20 16:55:10")
      },
      {
        id: "6",
        com_username: "SofíaGame",
        com_descripcion: "Esperaba más contenido en el juego base, pero está bien.",
        com_avatar: "https://randomuser.me/api/portraits/women/6.jpg",
        com_fecha: new Date("2025-03-19 12:40:50")
      },
      {
        id: "7",
        com_username: "MaxPro",
        com_descripcion: "Es un juego entretenido, pero tiene algunos bugs molestos.",
        com_avatar: "https://randomuser.me/api/portraits/men/7.jpg",
        com_fecha: new Date("2025-03-18 22:05:20")
      },
      {
        id: "8",
        com_username: "DaniGamer",
        com_descripcion: "La personalización de personajes es muy completa, me encantó.",
        com_avatar: "https://randomuser.me/api/portraits/women/8.jpg",
        com_fecha: new Date("2025-03-17 08:15:35")
      },
      {
        "id": "9",
        "com_username": "AlexPro",
        "com_descripcion": "Los gráficos y la jugabilidad son impresionantes, definitivamente lo recomiendo.",
        "com_avatar": "https://randomuser.me/api/portraits/men/10.jpg",
        "com_fecha": new Date("2025-03-18 14:30:20")
      },
      {
        "id": "10",
        "com_username": "GamerQueen",
        "com_descripcion": "La historia es envolvente, pero creo que el final pudo ser mejor.",
        "com_avatar": "https://randomuser.me/api/portraits/women/12.jpg",
        "com_fecha": new Date("2025-03-19 19:05:10")
      },
      {
        "id": "11",
        "com_username": "RetroFan",
        "com_descripcion": "Me recuerda a los clásicos, pero con mecánicas modernas. ¡Excelente combinación!",
        "com_avatar": "https://randomuser.me/api/portraits/men/15.jpg",
        "com_fecha": new Date("2025-03-20 11:45:50")
      }
    ]
  }*/

  private storageKey = 'comentarios';
  private deletedKey = 'comentariosEliminados';
  public comentarios$: BehaviorSubject<Comentario[]> = new BehaviorSubject<Comentario[]>([]);
  public comentariosJson: Comentario[] = []; // Comentarios desde el JSON

 
  constructor(private http: HttpClient) { 
    this.loadComentariosFromJson();
    this.loadStoredComentarios();
  }

  // Cargar comentarios desde JSON (sin guardarlos en localStorage)
  private loadComentariosFromJson() {
    this.http.get<Comentario[]>('assets/json/comentarios.json').subscribe((jsonComentarios) => {
      this.comentariosJson = jsonComentarios; // Guardar los del JSON en una variable
      this.updateCommentList(); // Actualizar la lista con JSON + LocalStorage
    });
  }

  // Cargar comentarios desde localStorage
  loadStoredComentarios() {
    this.updateCommentList();
    // localStorage.removeItem(this.storageKey); // Eliminar comentarios guardados
    // localStorage.removeItem(this.deletedKey); // Eliminar el localStorage de los escondidos eliminados
  }

  // Obtener comentarios desde localStorage
  getStoredComentarios(): Comentario[] {
    const stored = localStorage.getItem(this.storageKey);
    return stored ? JSON.parse(stored) : [];
  }

  // Guardar comentarios en localStorage
  private saveToStorage(comentarios: Comentario[]) {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(comentarios));
      this.updateCommentList();
    } catch (e) {
      if (e instanceof DOMException && e.name === 'QuotaExceededError') {
        alert('El límite de almacenamiento fue superado. Limpiando datos guardados.');
        localStorage.removeItem(this.storageKey);
        this.updateCommentList();
      } else {
        throw e; // Re-lanza si es otro tipo de error
      }
    }
  }

  // Agregar un nuevo comentario solo en localStorage
  agregarComentario(comentario: Comentario) {
    const comentarios = this.getStoredComentarios();
    comentarios.push(comentario);
    this.saveToStorage(comentarios);
  }

  // Actualizar un comentario
  actualizarComentario(comentarioActualizado: Comentario) {
    const comentarios = this.getStoredComentarios();
    const index = comentarios.findIndex(c => c.id === comentarioActualizado.id);

    if (index !== -1) {
      comentarios[index] = comentarioActualizado;
    } else {
      comentarios.push(comentarioActualizado); // <--- Esto es lo nuevo: si viene del JSON, lo guardas por primera vez
    }
  
    this.saveToStorage(comentarios);
  }

  // Eliminar y esconde los del json para que no los saque
  eliminarComentario(id: string): void {

    const idNumerico = Number(id);

    const comentarios = this.getStoredComentarios();
    const nuevosComentarios = comentarios.filter(c =>  Number(c.id) !==  idNumerico);
    this.saveToStorage(nuevosComentarios);
  
    // Guardar ID del comentario eliminado del JSON (si aplica)
    const idsEliminados = this.getDeletedIds();
    if (!idsEliminados.includes(idNumerico)) {
      idsEliminados.push(idNumerico);
      localStorage.setItem(this.deletedKey, JSON.stringify(idsEliminados));
    }
  
    this.updateCommentList();
  }

  getDeletedIds(): number[] {
    const eliminados = localStorage.getItem(this.deletedKey);
    return eliminados ? JSON.parse(eliminados) : [];
  }

  /*restaurarComentariosEliminados(): void {
    localStorage.removeItem(this.deletedKey);
    this.updateCommentList();
  */

  updateCommentList() {
    
    const storedComments = this.getStoredComentarios();
    const eliminados = this.getDeletedIds();
  
    // Obtener los IDs de comentarios que ya están en localStorage
    const idsEnStorage = storedComments.map(c => Number(c.id));
  
    // Filtrar comentarios del JSON: que no estén eliminados y no estén ya en localStorage
    const comentariosFiltrados = this.comentariosJson.filter(c => 
      !eliminados.includes(Number(c.id)) && !idsEnStorage.includes(Number(c.id))
    );
  
    // Combinar comentarios del JSON filtrado + los que están en localStorage
    const combinedComments = [...storedComments, ...comentariosFiltrados]; // se  coloco al reves para que salgan primero los que el usuario viewer 

    // Ordenar por ID de menor a mayor
    //combinedComments.sort((a, b) => Number(a.id) - Number(b.id));

    this.comentarios$.next(combinedComments);
  }

  getTotalDatos(): number {
    const eliminados = this.getDeletedIds();
    // Filtra los comentarios JSON que no han sido eliminados
    const comentariosJsonValidos = this.comentariosJson.filter(c => !eliminados.includes(Number(c.id)));
    // Toma los comentarios guardados en localStorage
    const comentariosLocal = this.getStoredComentarios();
    // Calcula total
    const total = comentariosJsonValidos.length + comentariosLocal.length;
    // Puedes devolver total, o total + 1 si es para generar el siguiente ID
    return total + 1;
  }

  //Para traer la fecha y hora actual
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

}
