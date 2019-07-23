import { Injectable } from '@angular/core';
import { Observable, of,timer } from 'rxjs';
import { catchError, map, tap, switchMap} from 'rxjs/operators';
import { HttpClient} from '@angular/common/http';


import { Producto } from './classes/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

 result: Producto[];

 uri = 'http://localhost:4000/SalesItem';

  constructor( private http:HttpClient) { }

  getProducto(id): Observable<Producto[]>{
    return this.http.get<Producto[]>(`${this.uri}/edit/${id}`).pipe(
        tap(_=> console.log('Fetche Product')),
        catchError(this.handleError<Producto[]>("getProducto",[]))
      );
  }

  getProductos(): Observable<Producto[]>{
    return this.http.get<Producto[]>(`${this.uri}`).pipe(
        tap(_=> console.log('Fetched Productos')),
        catchError(this.handleError<Producto[]>("getProductos",[]))
      );
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
