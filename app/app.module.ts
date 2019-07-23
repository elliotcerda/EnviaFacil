import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { InicioComponent } from './inicio/inicio.component';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';
import { ClientesComponent } from './clientes/clientes.component';
import { MenuComponent } from './menu/menu.component';
import { AppRoutingModule } from './/app-routing.module';
import { TopmenuComponent } from './topmenu/topmenu.component';
import { ClientesDetallesComponent } from './clientes-detalles/clientes-detalles.component';
import { ProductosComponent } from './productos/productos.component';
import { ProductosDetallesComponent } from './productos-detalles/productos-detalles.component';


@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    InicioSesionComponent,
    ClientesComponent,
    MenuComponent,
    TopmenuComponent,
    ClientesDetallesComponent,
    ProductosComponent,
    ProductosDetallesComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
