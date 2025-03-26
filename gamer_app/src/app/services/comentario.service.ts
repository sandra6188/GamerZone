import { Injectable } from '@angular/core';
import Comentario from '../models/Comentario';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {
  
  comentarios: Comentario[];

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
      }
    ]
  }
}
