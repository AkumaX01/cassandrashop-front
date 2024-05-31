import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private productos = [
    { categoria: 'Bebidas', id: '07ff1fc0-78b1-11ec-90d6-0242ac120001', nombre: 'Coca-Cola 500ml', costo: 1.00, imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2GEQt03s8Vc5d8gx05ErfB5bo7DFrXTaa1sHAyc27GQ&s', descripcion: 'Refresco de cola en presentación de 500ml' },
    { categoria: 'Bebidas', id: '07ff2222-78b1-11ec-90d6-0242ac120002', nombre: 'Pepsi 500ml', costo: 1.00, imagen: 'https://cdn.pixabay.com/photo/2023/10/23/17/53/bird-8336583_1280.jpg', descripcion: 'Refresco de cola en presentación de 500ml' },
    { categoria: 'Snacks', id: '07ff2382-78b1-11ec-90d6-0242ac120003', nombre: 'Galletas Oreo 154g', costo: 1.50, imagen: 'https://www.eluniversal.com.mx/resizer/mtAfCjT-LB5ze4cCq6Yj6vTFDXU=/1100x666/cloudfront-us-east-1.images.arcpublishing.com/eluniversal/XSFDXWPLWFEE3IEWVHN2NP3K7U.jpg', descripcion: 'Galletas Oreo en presentación de 154g' },
    { categoria: 'Snacks', id: '07ff24e2-78b1-11ec-90d6-0242ac120004', nombre: 'Chips Lays 200g', costo: 2.00, imagen: 'https://cdn.pixabay.com/photo/2023/10/23/17/53/bird-8336583_1280.jpg', descripcion: 'Papas Chips Lays en presentación de 200g' },
    { categoria: 'Dulces', id: '07ff2642-78b1-11ec-90d6-0242ac120005', nombre: 'Chocolate Snickers 50g', costo: 1.20, imagen: 'https://www.eluniversal.com.mx/resizer/mtAfCjT-LB5ze4cCq6Yj6vTFDXU=/1100x666/cloudfront-us-east-1.images.arcpublishing.com/eluniversal/XSFDXWPLWFEE3IEWVHN2NP3K7U.jpg_', descripcion: 'Chocolate Snickers en presentación de 50g' },
    { categoria: 'Bebidas', id: '07ff2784-78b1-11ec-90d6-0242ac120006', nombre: 'Agua Bonafont 600ml', costo: 0.80, imagen: 'https://cdn.pixabay.com/photo/2023/10/23/17/53/bird-8336583_1280.jpg', descripcion: 'Agua Bonafont en presentación de 600ml' },

    { categoria: 'Bebidas', id: '07ff1fc0-78b1-11ec-90d6-0242ac120001', nombre: 'Coca-Cola 500ml', costo: 1.00, imagen: 'https://drive.google.com/uc?id=1jFP02uhdH07J9cFxuODzCboTjB3bMclh', descripcion: 'Refresco de cola en presentación de 500ml' },
    { categoria: 'Bebidas', id: '07ff2222-78b1-11ec-90d6-0242ac120002', nombre: 'Pepsi 500ml', costo: 1.00, imagen: 'https://drive.google.com/uc?id=15O9p93eekg_C-sL1utQV1rk0EPjJXO6m', descripcion: 'Refresco de cola en presentación de 500ml' },
    { categoria: 'Snacks', id: '07ff2382-78b1-11ec-90d6-0242ac120003', nombre: 'Galletas Oreo 154g', costo: 1.50, imagen: 'https://drive.google.com/uc?id=1a1Pux7-52Y4Y2NIoADImIu33Kj4Bb9GB', descripcion: 'Galletas Oreo en presentación de 154g' },
    { categoria: 'Snacks', id: '07ff24e2-78b1-11ec-90d6-0242ac120004', nombre: 'Chips Lays 200g', costo: 2.00, imagen: 'https://drive.google.com/uc?id=1wJAf79K2QwzWPOK_Urucj9p7Rz3uB-o-', descripcion: 'Papas Chips Lays en presentación de 200g' },
    { categoria: 'Dulces', id: '07ff2642-78b1-11ec-90d6-0242ac120005', nombre: 'Chocolate Snickers 50g', costo: 1.20, imagen: 'https://drive.google.com/uc?id=1UZK2Q8UQik9iuA9-Ox6mISDMNH38MPh_', descripcion: 'Chocolate Snickers en presentación de 50g' },
    { categoria: 'Bebidas', id: '07ff2784-78b1-11ec-90d6-0242ac120006', nombre: 'Agua Bonafont 600ml', costo: 0.80, imagen: 'https://drive.google.com/uc?id=1hzwO7gU-PQuuQ9wPan5Dl1q6Kcbkwq_m', descripcion: 'Agua Bonafont en presentación de 600ml' },
    { categoria: 'Cereales', id: '07ff28e4-78b1-11ec-90d6-0242ac120007', nombre: 'Cereal Kellogg\'s Corn Flakes 250g', costo: 2.50, imagen: 'https://drive.google.com/uc?id=1JaaHrmDEkOoyJt0lxZmfXL5p4ku9d86K', descripcion: 'Cereal Kellogg\'s Corn Flakes en presentación de 250g' },
    { categoria: 'Bebidas Energéticas', id: '07ff2a4a-78b1-11ec-90d6-0242ac120008', nombre: 'Red Bull 250ml', costo: 2.00, imagen: 'https://drive.google.com/uc?id=1wwnHDM1uoft8vKHiVeGB_aGk-JtcG1yT', descripcion: 'Red Bull en presentación de 250ml' },
    { categoria: 'Bebidas', id: '07ff2b8a-78b1-11ec-90d6-0242ac120009', nombre: 'Sprite 500ml', costo: 1.00, imagen: 'https://drive.google.com/uc?id=1eSU2xumfXmOlkUcxXKg2KGdGDqby1HoN', descripcion: 'Refresco de lima-limón Sprite en presentación de 500ml' },
    { categoria: 'Snacks', id: '07ff2cea-78b1-11ec-90d6-0242ac120010', nombre: 'Doritos Nacho 150g', costo: 1.80, imagen: 'https://drive.google.com/uc?id=10VH9pA0rip755K4MevAVoGZOCsyYz9PV', descripcion: 'Papas fritas sabor Nacho en presentación de 150g' },
    { categoria: 'Dulces', id: '07ff2e4a-78b1-11ec-90d6-0242ac120011', nombre: 'M&M\'s Chocolate 100g', costo: 1.50, imagen: 'https://drive.google.com/uc?id=1fOC13KTtgROBFSlq3Kt0067bvd5EMVeY', descripcion: 'Caramelos de chocolate M&M\'s en presentación de 100g' },
    { categoria: 'Cereales', id: '07ff2faa-78b1-11ec-90d6-0242ac120012', nombre: 'Cereal Nestlé Cheerios 300g', costo: 3.00, imagen: 'https://drive.google.com/uc?id=1pofzHfKX237Jwsfm38CRinpfs76eMdEe', descripcion: 'Cereal Nestlé Cheerios en presentación de 300g' },
    { categoria: 'Bebidas', id: '07ff30ea-78b1-11ec-90d6-0242ac120013', nombre: 'Fanta Naranja 500ml', costo: 1.00, imagen: 'https://drive.google.com/uc?id=1SL85bpjK-NQeu3-yyZKwiaVIPw2kdudS', descripcion: 'Refresco de naranja Fanta en presentación de 500ml' },
    { categoria: 'Snacks', id: '07ff324a-78b1-11ec-90d6-0242ac120014', nombre: 'Pringles Original 150g', costo: 2.50, imagen: 'https://drive.google.com/uc?id=1pavrBzYfoxP1G43y0Qxaxq5WDLeBstXK', descripcion: 'Papas Pringles sabor Original en presentación de 150g' },
    { categoria: 'Dulces', id: '07ff33aa-78b1-11ec-90d6-0242ac120015', nombre: 'Twix 50g', costo: 1.20, imagen: 'https://drive.google.com/uc?id=12fiXOlqcHvVuVqKp8CtKkiO1VBd81ASB', descripcion: 'Barra de caramelo y galleta cubierta de chocolate Twix en presentación de 50g' },
  ];
  private categorias = ['Bebidas', 'Snacks', 'Dulces', 'Cereales'];

  constructor() { }

  obtenerProductos() {
    return this.productos;
  }

  obtenerProductosPorCategoria(categoria: string) {
    return this.productos.filter(producto => producto.categoria === categoria);
  }

  obtenerCategorias() {
    return this.categorias;
  }
 
}
