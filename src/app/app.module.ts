import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { ProductosComponent } from './productos/productos.component';
import { ProductoCardComponent } from './producto-card/producto-card.component';
import { QuienesSomosComponent } from './quienes-somos/quienes-somos.component';
import { AdminComponent } from './admin/admin.component';
import { CarritoComponent } from './carrito/carrito.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ReportesVentasComponent } from './reportes-ventas/reportes-ventas.component'; // Importar FormsModule
import { HttpClientModule } from '@angular/common/http';
import { ListaUsuariosComponent } from './lista-usuarios/lista-usuarios.component';
import { AgregarProductoComponent } from './agregar-producto/agregar-producto.component';
import { ReactiveFormsModule } from '@angular/forms';  // Asegúrate de importar ReactiveFormsModule




@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    FooterComponent,
    ProductosComponent,
    ProductoCardComponent,
    QuienesSomosComponent,
    AdminComponent,
    CarritoComponent,
    LoginComponent,
    SignupComponent,
    ReportesVentasComponent,
    ListaUsuariosComponent,
    AgregarProductoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
