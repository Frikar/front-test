import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: HttpClient) {

  }

  /**
   *  Servicio para obtener la lista completa de todas las orders
   *  Retorna una observable con las orders en la BD
   *
   */
  getAllData(): Observable<any> {
    return this.http.get(`${environment.apiUrl}orders/`)
  }

  /**
   *  Servicio para obtener una order en específico
   *  Usa el valor IdOrder de la Order
   *
   */
  getData(id: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}orders/${id}`)
  }

  /**
   *  Servicio para crear una order en la BD
   *  Recibe la data desde un emit en el modal
   *
   */
  postData(data: {}): Observable<any> {
    return this.http.post(`${environment.apiUrl}orders/`, data)
  }

  /**
   *  Servicio para editar una order
   *  Recibe una interfaz con ID y la data para actualizar
   *
   */
  updateData(data: {}, id: number): Observable<any> {
    return this.http.put(`${environment.apiUrl}orders/${id}`, data)
  }

  /**
   *  Servicio para eliminar una order
   *  Recibe el ID desde un el listado
   *
   */
  deleteData(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}orders/${id}`)
  }
}
