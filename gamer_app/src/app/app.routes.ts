import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductoComponent } from './pages/producto/producto.component';
import { ComentarioComponent } from './pages/comentario/comentario.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { SobrenosotrosComponent } from './pages/sobrenosotros/sobrenosotros.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';

export const routes: Routes = [
    {path: '', component:HomeComponent},
    {path: 'productos', component:ProductoComponent},
    {path: 'comentarios', component:ComentarioComponent},
    {path: 'contactos', component:ContactoComponent},
    {path: 'register', component:RegisterComponent},
    {path: 'login', component:LoginComponent},
    {path: 'perfil', component:PerfilComponent},
    {path: 'sobrenosotros', component:SobrenosotrosComponent},
    {path: 'usuario', component:UsuarioComponent}
];
