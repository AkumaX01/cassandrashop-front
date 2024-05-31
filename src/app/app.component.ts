import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tienda';
  
  categoriaSeleccionada: string = '';

  onCategoriaSeleccionada(categoria: string): void {
    this.categoriaSeleccionada = categoria;
  }
  
}
