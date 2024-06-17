// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductosComponent } from './productos/productos.component';
import { AdminComponent } from './admin/admin.component';
import { QuienesSomosComponent } from './quienes-somos/quienes-somos.component';
import { CarritoComponent } from './carrito/carrito.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ReportesVentasComponent } from './reportes-ventas/reportes-ventas.component';
import { ListaUsuariosComponent } from './lista-usuarios/lista-usuarios.component';
import { AgregarProductoComponent } from './agregar-producto/agregar-producto.component';
import { AuthGuard } from './AuthGuard';

const routes: Routes = [
  { path: 'productos', component: ProductosComponent, canActivate: [AuthGuard] },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
  { path: 'quienes-somos', component: QuienesSomosComponent , canActivate: [AuthGuard]},
  { path: 'carrito', component: CarritoComponent , canActivate: [AuthGuard]},
  { path: 'signup', component: SignupComponent, canActivate: [AuthGuard] },
  { path: 'reportes', component: ReportesVentasComponent , canActivate: [AuthGuard]},
  { path: 'lista-usuarios', component: ListaUsuariosComponent , canActivate: [AuthGuard]},
  { path: 'agregar-producto', component: AgregarProductoComponent , canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent }, // No se aplica canActivate aquí
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirige al login por defecto
  { path: '**', redirectTo: '/login', pathMatch: 'full' } // Redirige al login por defecto
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
