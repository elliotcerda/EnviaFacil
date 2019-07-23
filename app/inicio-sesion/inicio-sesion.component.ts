import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css']
})
export class InicioSesionComponent {

   constructor(){}

   ngOnInit(){}

   onClickSubmit(data){  
  	console.log(data);
  }

}
