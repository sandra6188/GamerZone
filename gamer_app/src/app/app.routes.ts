import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ServicioComponent } from './pages/servicio/servicio.component';
import { ComentarioComponent } from './pages/comentario/comentario.component';
import { ContactoComponent } from './pages/contacto/contacto.component';

export const routes: Routes = [
    {path: '', component:HomeComponent},
    {path: 'servicios', component:ServicioComponent},
    {path: 'comentarios', component:ComentarioComponent},
    {path: 'contactos', component:ContactoComponent}
];
