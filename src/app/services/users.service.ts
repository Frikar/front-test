import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) {
  }

  /**
   *  Servicio para obtener la lista completa de todos los usuarios
   *  Retorna una observable con los usuarios en la BD
   *
   */
  getAllUser(): Observable<any> {
    return this.http.get(`${environment.apiUrl}users/`)
  }
}
