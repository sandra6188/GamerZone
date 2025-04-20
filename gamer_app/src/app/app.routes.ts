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
import { DetailProductoComponent } from './components/detail-producto/detail-producto.component';
import { DetailComentarioComponent } from './components/detail-comentario/detail-comentario.component';
import { DetailUsuarioComponent } from './components/detail-usuario/detail-usuario.component';
import { DetailAddcarritoComponent } from './components/detail-addcarrito/detail-addcarrito.component';

export const routes: Routes = [
    {path: '', component:HomeComponent},
    {path: 'productos', component:ProductoComponent},
    {path: 'comentarios', component:ComentarioComponent},
    {path: 'contactos', component:ContactoComponent},
    {path: 'register', component:RegisterComponent},
    {path: 'login', component:LoginComponent},
    {path: 'perfil', component:PerfilComponent},
    {path: 'sobrenosotros', component:SobrenosotrosComponent},
    {path: 'usuario', component:UsuarioComponent},
    {path: 'detail-producto', component: DetailProductoComponent },   
    {path: 'detail-producto/:id', component:DetailProductoComponent},
    {path: 'detail-comentario', component: DetailComentarioComponent },   
    {path: 'detail-comentario/:id', component:DetailComentarioComponent},
    {path: 'detail-usuario', component: DetailUsuarioComponent },   
    {path: 'detail-usuario/:id', component:DetailUsuarioComponent},
    {path: 'detail-addcarrito/:id', component:DetailAddcarritoComponent}
];
