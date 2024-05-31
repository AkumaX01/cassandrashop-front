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
import { FormsModule } from '@angular/forms'; // Importar FormsModule


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    FooterComponent,
    ProductosComponent,
    ProductoCardComponent,
    QuienesSomosComponent,
    AdminComponent,
    CarritoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
