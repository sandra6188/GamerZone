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
import { ListComentariosComponent } from './pages/list-comentarios/list-comentarios.component';
import { AuthSinChildGuard } from './guards/auth-sin-child.guard';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/auth-role.guard';

export const routes: Routes = [
    {path: '', component:HomeComponent},
    // {
    //     path: 'productos',
    //     component: ProductoComponent,
    //     canActivateChild: [AuthGuard], // Protege la ruta principal
    //     children: [
    //       { path: 'detail-producto', component: DetailProductoComponent },
    //       { path: 'detail-producto/:id', component: DetailProductoComponent }
    //     ],
    // },
    // {path: 'comentarios', component:ComentarioComponent},
    // {
    //     path: 'list-comentarios',
    //     component: ListComentariosComponent,
    //     canActivate: [AuthSinChildGuard, RoleGuard],
    //     canActivateChild: [AuthGuard], // Protege la ruta principal
    //     children: [
    //         {path: 'detail-comentario', component: DetailComentarioComponent},   
    //         {path: 'detail-comentario/:id', component:DetailComentarioComponent},
    //     ],
    // },
    // {path: 'contactos', component:ContactoComponent},
    // {path: 'register', component:RegisterComponent},
    // {path: 'login', component:LoginComponent},
    // {path: 'perfil', component:PerfilComponent, canActivate: [AuthSinChildGuard]},
    // {path: 'sobrenosotros', component:SobrenosotrosComponent, canActivate: [AuthSinChildGuard, RoleGuard]},
    // {
    //     path: 'usuario',
    //     component: UsuarioComponent,
    //     canActivate: [AuthSinChildGuard, RoleGuard],
    //     canActivateChild: [AuthGuard], // Protege la ruta principal
    //     children: [
    //         {path: 'detail-usuario', component: DetailUsuarioComponent},   
    //         {path: 'detail-usuario/:id', component:DetailUsuarioComponent},
    //     ],
    // },
    // {path: 'detail-addcarrito/:id', component:DetailAddcarritoComponent, canActivate: [AuthSinChildGuard]}
   
  

    {path: 'productos', component:ProductoComponent},
    {path: 'comentarios', component:ComentarioComponent},
    {path: 'list-comentarios', component:ListComentariosComponent, canActivate: [AuthSinChildGuard, RoleGuard]},
    {path: 'contactos', component:ContactoComponent},
    {path: 'register', component:RegisterComponent},
    {path: 'login', component:LoginComponent},
    {path: 'perfil', component:PerfilComponent, canActivate: [AuthSinChildGuard]},
    {path: 'sobrenosotros', component:SobrenosotrosComponent, canActivate: [AuthSinChildGuard, RoleGuard]},
    {path: 'usuario', component:UsuarioComponent, canActivate: [AuthSinChildGuard, RoleGuard]},
    {path: 'detail-producto', component: DetailProductoComponent,  canActivate: [AuthSinChildGuard,RoleGuard] },   
    {path: 'detail-producto/:id', component:DetailProductoComponent, canActivate: [AuthSinChildGuard,RoleGuard]},
    {path: 'detail-comentario', component: DetailComentarioComponent, canActivate: [AuthSinChildGuard,RoleGuard]},   
    {path: 'detail-comentario/:id', component:DetailComentarioComponent, canActivate: [AuthSinChildGuard,RoleGuard]},
    {path: 'detail-usuario', component: DetailUsuarioComponent, canActivate: [AuthSinChildGuard,RoleGuard]},   
    {path: 'detail-usuario/:id', component:DetailUsuarioComponent, canActivate: [AuthSinChildGuard,RoleGuard]},
    {path: 'detail-addcarrito/:id', component:DetailAddcarritoComponent, canActivate: [AuthSinChildGuard,RoleGuard]}
];
