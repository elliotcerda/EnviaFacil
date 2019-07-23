import { Component, OnInit } from '@angular/core';
import { Producto } from '../classes/producto';
import { ProductosService } from '../productos.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  
  productos: Producto[];
  producto : Producto;
  // cliente.nombre="Elliot";
  constructor(private productosService: ProductosService) { }

  ngOnInit() {
    this.getProductos();
  }

  getProductos():void {
      this.productosService.getProductos()
      .subscribe(productos => this.productos = productos);      
  }

  //Events

  onSelect(producto:Producto){
    this.producto=producto;
    console.log(this.producto);
  }

}
