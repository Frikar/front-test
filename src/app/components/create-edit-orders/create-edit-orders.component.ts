import {Component, OnInit, EventEmitter, Output, Input} from '@angular/core';
import {UsersService} from "../../services/users.service";
import {Users, User} from "../../model/users.model";
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {Constants} from "../../constants/constants";
import {Order} from "../../model/orders.model";

@Component({
  selector: 'orders-create-edit-modal',
  templateUrl: './create-edit-orders.component.html',
  styleUrls: ['./create-edit-orders.component.css']
})
export class CreateEditOrdersComponent implements OnInit {

  /**
   * Declaramos los eventos a emitir y los props que recibiremos del componente padre
   */
  @Input() modal!: string;
  @Input() order!: Order;
  @Output() created = new EventEmitter<any>();
  @Output() updated = new EventEmitter<any>();
  @Output() closed = new EventEmitter<any>();

  users: User[] = [];
  orderForm!: FormGroup;

  constructor(private userService: UsersService) {

  }

  /**
   * Iniciamos el FormGroup junto con sus validaciones, dentro de nuestro template
   * hacemos la asginación de cada FormControl y desactivamos el boton de submit
   * mientras el formulario no sea válido, se usan las constantes como Regex en los patterns
   */
  ngOnInit(): void {
    this.orderForm = new FormGroup({
      id_user: new FormControl('', {
        validators: [Validators.required],
      }),
      order_number: new FormControl('', {
        validators: [Validators.required, Validators.pattern(Constants.Pattern.Only.OnlyNumber)],
      }),
      datetime: new FormControl('', {
        validators: [Validators.required],
      }),
      provider_name: new FormControl('', {
        validators: [Validators.required, Validators.pattern(Constants.Pattern.Form.Name)],
      }),
      observation: new FormControl('', {
        validators: [Validators.required, Validators.pattern(Constants.Pattern.Form.Content)],
      }),
      status: new FormControl('', {
        validators: [Validators.required],
      }),
    }, {updateOn: 'change'});
    this.userService.getAllUser().subscribe((values: Users) => {
      this.users = values.data
    })
    this.setValue()
  }

  /**
   * Realizamos los Get para obtener cada valor específico del FormGroup y poder hacer validaciones
   * desde nuestro html para los distintos casos invalidos
   */
  get idUser() {
    return this.orderForm.get('id_user');
  }

  get dateTime() {
    return this.orderForm.get('datetime');
  }

  get providerName() {
    return this.orderForm.get('provider_name');
  }

  get observation() {
    return this.orderForm.get('observation');
  }

  get status() {
    return this.orderForm.get('status');
  }

  get orderNumber() {
    return this.orderForm.get('order_number');
  }

  /**
   * Finalización de los Get para los FormControl
   */


  /**
   * Metodo que se encarga de emitir los eventos al momento de hacer un submit del formulario
   * Estos eventos envian la información necearia para cada servicio que realizara modificaciones en la API
   */
  onSubmit(): void {
    if (this.modal === "Create") {
      this.created.emit(this.orderForm.value)
    } else {
      this.updated.emit({IdOrder: this.order.IdOrder, data: this.orderForm.value})
    }
  }

  /**
   * Creamos el metodo setValue con la funcionalidad de setear nuestro FormGroup al momento de editar un registro,
   * a diferencia de productos, no asigna ningún valor al momento de crear un registro nuevo
   * Se hace un llamado a este metodo cada vez que se inicia el modal en modo Update
   */
  setValue() {
    if (this.modal === "Update") {
      setTimeout(() => {
        this.orderForm.setValue({
          id_user: this.order.IdUser,
          order_number: this.order.OrderNumber,
          datetime: this.timeSet(this.order.DateTime),
          provider_name: this.order.ProviderName,
          observation: this.order.Observation,
          status: this.order.Status
        })
      }, 500);
    }
  }

  /**
   * Metodo que recibe el valor datetime desde la base de datos y lo formatea teniendo en cuenta la zona horaria
   * del computador de cada usuario, logrando así mantener siempre el mismo registro Datetime
   */
  timeSet(value: string): string {
    let date = new Date(value)
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    return date.toISOString().slice(0, 16)
  }

  /**
   * Metodo para emitir un evento que avise al componente padre y este pueda desmontar el componente del Modal
   */
  close(): void {
    this.closed.emit(this.orderForm.value)
  }
}
