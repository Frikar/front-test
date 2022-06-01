import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) {
  }

  /**
   * Servicio para obtener la lista completa de todos los productos
   *  Retorna una observable con los productos en la BD
   *
   */
  getAllData(): Observable<any> {
    return this.http.get(`${environment.apiUrl}products/`)
  }

  /**
   *  Servicio para obtener un producto en específico
   *  Usa el valor IdOrderProducts del producto
   *
   */
  getData(id: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}products/${id}`)
  }

  /**
   *  Servicio para crear un producto en la BD
   *  Recibe la data desde un emit en el modal
   *
   */
  postData(data: {}): Observable<any> {
    return this.http.post(`${environment.apiUrl}products/`, data)
  }

  /**
   *  Servicio para editar un producto
   *  Recibe una interfaz con ID y la data para actualizar
   *
   */
  updateData(data: {}, id: number): Observable<any> {
    console.log(id)
    return this.http.put(`${environment.apiUrl}products/${id}`, data)
  }

  /**
   *  Servicio para eliminar un producto
   *  Recibe el ID desde un el listado
   *
   */
  deleteData(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}products/${id}`)
  }
}
