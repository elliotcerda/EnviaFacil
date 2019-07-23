import { Component, OnInit } from '@angular/core';
import { Cliente } from '../classes/cliente'
import { ClientesService } from '../clientes.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  clientes: Cliente[];
  cliente : Cliente;
  // cliente.nombre="Elliot";
  constructor(private clientesService: ClientesService) { }

  ngOnInit() {
    this.getClientes();
  }

  getClientes():void {
      this.clientesService.getClientes()
      .subscribe(clientes => this.clientes = clientes);      
  }

  //Events

  onSelect(cliente:Cliente){
    this.cliente=cliente;
    console.log(this.cliente);
  }

}
