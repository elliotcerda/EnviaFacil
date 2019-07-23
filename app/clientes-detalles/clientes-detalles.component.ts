import { Component, OnInit, Input } from '@angular/core';
import { Cliente } from '../classes/Cliente';
import { ClientesService } from '../clientes.service';
import { Location } from '@angular/common';
import { ActivatedRoute}  from '@angular/router';

import { FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
// import { ValidateUser } from '../Validators/user.validator';

@Component({
  selector: 'app-clientes-detalles',
  templateUrl: './clientes-detalles.component.html',
  styleUrls: ['./clientes-detalles.component.css']
})

export class ClientesDetallesComponent implements OnInit {
  cliente :Cliente;
  cliente_id :number;

  message="";
  message_class="";
  isSubmitted = false;
  inputUser: Boolean;
  clienteForm: FormGroup;

  constructor(
      private location: Location,
      private route: ActivatedRoute,
      private clientesService: ClientesService
    ) { }

  ngOnInit() {
    this.createForm();
    this.getCliente();
  }

  createForm(){
    this.cliente_id =+ this.route.snapshot.paramMap.get(`id`);

    this.clienteForm = new FormGroup({
        nombre : new FormControl("",[
          Validators.required,
          ]),
        telefono : new FormControl("",[
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(10)
          ]),
        direccion : new FormControl("",[
          Validators.required,
          Validators.maxLength(200)
          ]),
        usuario : new FormControl(""),
        contrasena : new FormControl("")
    });

    if (this.cliente_id === 0) {
      console.log("sdfsdf"+this.cliente_id);
       this.clienteForm.controls['usuario'].setValidators([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(10),
          this.noSpacesValidator]);

       this.clienteForm.controls['usuario'].setAsyncValidators( this.userExists.bind(this));
       this.clienteForm.controls['contrasena'].setValidators([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(12)
            ]);

       this.clienteForm.controls['usuario'].updateValueAndValidity();
       this.clienteForm.controls['contrasena'].updateValueAndValidity();
    }

    this.onFormChanges();
  }

  onFormChanges(){
    this.clienteForm.valueChanges.subscribe(val=>{
        console.log(this.clienteForm.controls['usuario'].errors);
        // console.log(!val.usuario.includes(' ') ?  { 'whitespace': true }: null  ); 
  
    });    
  }

  userExists(control: AbstractControl){
    return this.clientesService.searchUser(control.value).pipe();
  }


  noSpacesValidator(control:AbstractControl){
    return control.value.includes(' ') ?  { 'whitespace': true }: null ; 
  }

  getCliente(): void {

    this.cliente_id =+ this.route.snapshot.paramMap.get(`id`);
    if (this.cliente_id==0) {
        // Define if user input is disable or not
        this.clienteForm.controls['usuario'].enable();
    }else{
       // Define if user input is disable or not
        this.clienteForm.controls['usuario'].disable();
        this.clientesService.getCliente(this.cliente_id)  
        .subscribe(data =>
          { 
            this.cliente= data;
            this.clienteForm.setValue({
                  nombre:this.cliente[0].nombre,
                  telefono:this.cliente[0].telefono,
                  direccion:this.cliente[0].direccion,
                  usuario:this.cliente[0].usuario,
                  contrasena: ""
                });
          }
       );            
    }
     console.log("Id cliente: "+this.cliente_id);  
  }

  onSubmitSave(){
    // console.log("On submit clicked, client_id: "+this.cliente_id);

    console.log(this.clienteForm);
      this.message="El cliente fue ";
      this.isSubmitted=true;
      if(this.cliente_id==0) {
        //Create
         this.clientesService.addClienteHttp(this.clienteForm.value)
           this.message=this.message+" creado."; 
           this.message_class="success";
         
           
      }else{
         this.clientesService.updateClienteHttp(this.cliente_id, this.clienteForm.value)
            this.message=this.message+" modificado."; 
            this.message_class="success";
                console.log("updating cliente: "+this.cliente_id);
         
    }
  }

  goBack():void{
    this.location.back();
  }


}
