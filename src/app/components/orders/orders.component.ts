import {Component, OnInit} from '@angular/core';
import {OrdersService} from '../../services/orders.service';
import {Orders, Order, OrderUpdate} from "../../model/orders.model";
import {faPlusCircle, faSearch, faEdit} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  faPlusCircle = faPlusCircle;
  faEdit = faEdit;
  faSearch = faSearch;
  orders: Order[] = [];
  modal: string = "Create";
  loaded: boolean = false;
  order!: Order;

  constructor(
    private orderService: OrdersService
  ) {
  }

  /**
   * Obtenemos los datos desde nuestra API al cargar el componente
   */
  ngOnInit() {
    this.getOrders()
  }

  /**
   * Creamos el metodo que se encargara de actualizar
   * la información desde nuestra API cuando sea necesario
   */
  getOrders(): void {
    this.orderService.getAllData()
      .subscribe((values: Orders) => {
        this.orders = values.data
      })
  }
  /**
   * El metodo getOrder sirve para obtener el item específico que será manejado en el modal para editar
   */
  getOrder(id: number): void {
    this.orderService.getData(id).subscribe(value => {
      this.order = value.data
    })
  }
  /**
   * Creamos el metodo para añadir un nuevo order y luego actualizamos la data al completar el servicio
   */
  createOrder(value: {}): void {
    this.orderService.postData(value).subscribe(() => {
      this.getOrders()
    })
    this.modalEvent()
  }

  /**
   * Este metodo nos permite hacer ediciones de un registro,
   * recibe una interfaz con los valores necesarios para realizar el PUT
   */
  updateOrder(value: OrderUpdate): void {
    this.orderService.updateData(value.data, value.IdOrder).subscribe(() => {
      this.getOrders()
    })
    this.modalEvent()
  }

  /**
   * Metodo para borrar un order al ser llamado por un evento click
   */
  deleteOrder(id: number): void {
    this.orderService.deleteData(id).subscribe(() => {
      this.getOrders()
    })
  }

  /**
   * Este metodo asigna la opción para crear un registro usando un mismo componente de modal
   */
  changeModalCreate(): void {
    this.modal = "Create"
    this.loaded = true
  }

  /**
   * updateModal recibe un ID con el cual obtiene un objeto editable y carga el componente de modal
   * comprartido con la función de crear
   */
  updateModal(id: number): void {
    this.modal = "Update"
    this.getOrder(id)
    this.loaded = true
  }

  /**
   * modalEvent es un metodo que permite desmontar el componente del modal en el DOM
   */
  modalEvent(): void {
    this.loaded = !this.loaded;
  }

  title = 'front-test';
}
