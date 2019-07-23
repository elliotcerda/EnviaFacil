import { Component, OnInit } from '@angular/core';
import { Producto } from '../classes/producto';
import { ProductosService } from '../productos.service';
import { Location } from '@angular/common';
import { ActivatedRoute}  from '@angular/router';

import { FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-productos-detalles',
  templateUrl: './productos-detalles.component.html',
  styleUrls: ['./productos-detalles.component.css']
})
export class ProductosDetallesComponent implements OnInit {

  producto :Producto;
  producto_id :number;

  message="";
  message_class="";
  isSubmitted = false;
  inputUser: Boolean;
  productoForm: FormGroup;
  current_img_url:string;

  constructor(
      private location: Location,
      private route: ActivatedRoute,
      private productosService: ProductosService
    ) { }

  ngOnInit() {
     this.createForm();
     this.getProducto();
  }

  createForm(){
    this.producto_id =+ this.route.snapshot.paramMap.get(`id`);

    this.productoForm = new FormGroup({
        nombre : new FormControl("",[
            Validators.required,
          ]),
        descripcion : new FormControl("",[
            Validators.required,
          ]),
        codigo : new FormControl("",[
            Validators.required,
            this.noSpacesValidator
          ]),
        imagen : new FormControl("");
    });

    if (this.producto_id === 0) {
      console.log("sdfsdf"+this.producto_id);
       this.productoForm.controls['nombre'].setValidators([
          Validators.required]);

       this.productoForm.controls['nombre'].setAsyncValidators( this.nombreExists.bind(this));

       this.productoForm.controls['descripcion'].setValidators([
          Validators.required]);

       this.productoForm.controls['codigo'].setValidators([
          Validators.required,
          this.noSpacesValidator]);

       this.productoForm.controls['codigo'].setAsyncValidators( this.codigoExists.bind(this));

       this.productoForm.controls['imagen'].setValidators([
          Validators.required]);

       this.productoForm.controls['nombre'].updateValueAndValidity();
       this.productoForm.controls['descripcion'].updateValueAndValidity();
       this.productoForm.controls['codigo'].updateValueAndValidity();
       this.productoForm.controls['imagen'].updateValueAndValidity();
    }

    this.onFormChanges();
  }

  onFormChanges(){
    this.productoForm.valueChanges.subscribe(val=>{
        console.log(this.productoForm.controls['nombre'].errors);
        // console.log(!val.usuario.includes(' ') ?  { 'whitespace': true }: null  ); 
  
    });    
  }

  nombreExists(control: AbstractControl){
    return this.productosService.searchNombre(control.value).pipe();
  }

  codigoExists(control: AbstractControl){
    return this.productosService.searchCodigo(control.value).pipe();
  }


  noSpacesValidator(control:AbstractControl){
    return control.value.includes(' ') ?  { 'whitespace': true }: null ; 
  }

  getProducto(): void {

    this.producto_id =+ this.route.snapshot.paramMap.get(`id`);
    if (this.producto_id==0) {
        // Define if user input is disable or not
        this.productoForm.controls['codigo'].enable();
    }else{
       // Define if user input is disable or not
        this.productoForm.controls['codigo'].disable();
        this.productosService.getProducto(this.producto_id)  
        .subscribe(data =>
          { 
            this.producto= data;
            this.current_img_url="http://localhost:4000/imagen/get/"+this.producto[0].imagen;
            this.productoForm.setValue({
                  nombre:this.producto[0].nombre,
                  descripcion:this.producto[0].descripcion,
                  codigo:this.producto[0].codigo,
                  imagen:""
                });
          }
       );            
    }
     console.log("Id producto: "+this.producto_id);  
  }

  // onSubmitSave(){
  //   // console.log("On submit clicked, client_id: "+this.cliente_id);

  //   console.log(this.productoForm);
  //     this.message="El producto fue ";
  //     this.isSubmitted=true;
  //     if(this.producto_id==0) {
  //       //Create
  //        this.productosService.addProductoHttp(this.productoForm.value)
  //          this.message=this.message+" creado."; 
  //          this.message_class="success";
         
           
  //     }else{
  //        this.productosService.updateProductoHttp(this.producto_id, this.productoForm.value)
  //           this.message=this.message+" modificado."; 
  //           this.message_class="success";
  //               console.log("updating producto: "+this.producto_id);
         
  //   }
  // }

  goBack():void{
    this.location.back();
  }


}


