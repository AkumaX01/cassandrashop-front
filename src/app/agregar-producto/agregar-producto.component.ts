import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AgregarProductoService } from '../agregar-producto.service';
import { AutenticacionLogService } from '../autenticacion-log.service';
import { DataService } from '../data.service';
import { SucursalService } from '../sucursal.service';

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.component.html',
  styleUrls: ['./agregar-producto.component.css'],
})
export class AgregarProductoComponent implements OnInit {
  productoForm: FormGroup;
  isLoading = false;
  error = '';
  categorias: string[] = [];
  sucursales: any[] = [];
  user: any = null;

  constructor(
    private fb: FormBuilder,
    private productoService: AgregarProductoService,
    private authService: AutenticacionLogService,
    private dataService: DataService,
    private sucursalesService: SucursalService
  ) {
    this.productoForm = this.fb.group({
      categoria: ['', Validators.required],
      nombre: ['', Validators.required],
      id_sucursal: ['', Validators.required],
      costo: [0, [Validators.required, Validators.min(0)]],
      cantidad: [0, [Validators.required, Validators.min(0)]],
      imagen: [''],
    });
  }

  ngOnInit(): void {
    // Subscribirse al observable de usuario para obtener el id_sucursal
    this.authService.user$.subscribe((user) => {
      if (user && user.id_sucursal) {
        this.user = user;
        if (user.rol == 'Director') {
          this.productoForm.get('id_sucursal')?.enable({ emitEvent: true });
        } else {
          this.productoForm.get('id_sucursal')?.disable({ emitEvent: true });
        }
        this.productoForm.setValue({
          ...this.productoForm.value,
          id_sucursal: user.id_sucursal,
        });
      }
    });
    this.dataService
      .obtenerCategorias()
      .subscribe((cat) => (this.categorias = cat));
    this.sucursalesService.obtenerSucursales().subscribe((sucursales) => {
      console.log({ sucursales });
      this.sucursales = sucursales;
    });
  }

  onSubmit(): void {
    if (this.productoForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.error = '';

    const producto = {
      ...this.productoForm.getRawValue(),
    };

    this.productoService.addProduct(producto).subscribe(
      (response) => {
        console.log('Producto agregado exitosamente', response);
        this.isLoading = false;
        this.productoForm.reset();
      },
      (error) => {
        console.error('Error al agregar producto', error);
        this.error = 'Error al agregar producto. Inténtalo de nuevo más tarde.';
        this.isLoading = false;
      }
    );
  }
}
