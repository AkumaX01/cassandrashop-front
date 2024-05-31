import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductosComponent } from './productos/productos.component';
import { AdminComponent } from './admin/admin.component';
import { QuienesSomosComponent } from './quienes-somos/quienes-somos.component';
import { CarritoComponent } from './carrito/carrito.component';

const routes: Routes = [
  { path: 'productos', component: ProductosComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'quienes-somos', component: QuienesSomosComponent },
  { path: 'carrito', component: CarritoComponent },
  { path: '', redirectTo: '/productos', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
