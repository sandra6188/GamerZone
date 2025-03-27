import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductoComponent } from './pages/producto/producto.component';
import { ComentarioComponent } from './pages/comentario/comentario.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';

export const routes: Routes = [
    {path: '', component:HomeComponent},
    {path: 'productos', component:ProductoComponent},
    {path: 'comentarios', component:ComentarioComponent},
    {path: 'contactos', component:ContactoComponent},
    {path: 'register', component:RegisterComponent},
    {path: 'login', component:LoginComponent}
];
