import { Injectable } from '@angular/core';
import { Observable, of,timer } from 'rxjs';
import { catchError, map, tap, switchMap} from 'rxjs/operators';
import { HttpClient} from '@angular/common/http';


import { Cliente } from './classes/cliente';
import { CLIENTES } from "./mock-data/mock-clientes";


@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  result: Cliente[];

  uri = 'http://localhost:4000/cliente';


  constructor(private http: HttpClient) { }
  
  getClientes(): Observable<Cliente[]>{
    return this.http.get<Cliente[]>(`${this.uri}`).pipe(
        tap(_=> console.log('Fetched clientes')),
        catchError(this.handleError<Cliente[]>("getClientes",[]))
      );
  }

  getCliente(id: Number):  Observable<Cliente>{
    return this.http.get<Cliente>(`${this.uri}/edit/${id}`).pipe(
       tap(_=> console.log(`Cliente fetched id = ${id} `)),
       catchError(this.handleError<Cliente>(`getCliente id =${id}`))
      );
  	// return of(CLIENTES.find(cliente=> cliente.id===id)).pipe(
   //      tap(_=> console.log(`Cliente fetched id = ${id} `)),
   //      catchError(this.handleError<Cliente>(`getCliente id =${id}`))
   //    );
  }

  searchCliente(term: String ): Observable<Cliente[]>{
    if(!term.trim()){
      return of([]);
    }else{
           for (var a=0; a <= 0; a++) 
           {
             if (CLIENTES[a].nombre.startsWith("term")) {
               this.result.push(CLIENTES[a]);
             }
            
           }
        return of(this.result).pipe(
             tap(_=> console.log(`Searching cliente: ${term}` )),
             catchError(this.handleError<Cliente[]>("searchCliente term = ${term}"))
           );      
    }
  }

  addCliente(cliente:Cliente) : Observable<Cliente>{
  	cliente.id=CLIENTES.length+1;
    CLIENTES.push(cliente);
  	return of(cliente).pipe(
           tap(_=> console.log(`Adding cliente: ${cliente.id}` )),
           catchError(this.handleError<Cliente>("addCliente cliente = ${term}"))
         );    

  }

  //return//: Observable<Cliente>
  addClienteHttp(cliente:Cliente) {
    cliente.id=0;
    // CLIENTES.push(cliente);
    console.log(this.uri);

    this.http.post(`${this.uri}/add/`,cliente)
    .subscribe(res => console.log(`Client creation done`));
    
    // return of(cliente).pipe(
    //        tap(_=> console.log(`Adding cliente: ${cliente.id}` )),
    //        catchError(this.handleError<Cliente>("addCliente cliente = ${term}"))
    //      );    

  }
  searchUser(user:String): Observable<any> {
     // return this.http.get(`${this.uri}/searchUser/${user}`)
     //    .pipe(map(user => {
     //        return (user!=0 ) ? {"userExists":true}:null;
     //  }));

     return timer(800).pipe(
       switchMap(() => this.http.get(`${this.uri}/searchUser/${user}`)
          .pipe(map(user => {
            return (user!=0 ) ? {"userExists":true}:null;
            })))
       );    
  }

  updateClienteHttp(id: number, cliente:Cliente) {
   cliente.id= id;
   var clienteJson = JSON.stringify(cliente);
   this.http.get(`${this.uri}/update/${clienteJson}`,)
     .subscribe(res => console.log(`Client update succesfully`));
  }

  updateCliente(id: Number, cliente:Cliente) : Observable<boolean>{
    var index = CLIENTES.findIndex(x=> x.id===id);
    CLIENTES[index].nombre=cliente.nombre;
    CLIENTES[index].telefono=cliente.telefono;
    CLIENTES[index].direccion=cliente.direccion;
    // CLIENTES[index].usuario=cliente.usuario;
    CLIENTES[index].contrasena=cliente.contrasena;
    return of(true);

  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
 
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
 
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
 
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
