import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import {Product} from "../../model/product.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Constants} from "../../constants/constants";

@Component({
  selector: 'products-create-edit',
  templateUrl: './create-edit-products.component.html',
  styleUrls: ['./create-edit-products.component.css']
})
export class CreateEditProductsComponent implements OnInit {

  /**
   * Declaramos los eventos a emitir y los props que recibiremos del componente padre
   */
  @Input() modal!: string;
  @Input() product!: Product;
  @Input() orderId!: number;
  @Output() created = new EventEmitter<any>();
  @Output() updated = new EventEmitter<any>();
  @Output() closed = new EventEmitter<any>();

  productsForm!: FormGroup;

  constructor() {
  }

  /**
   * Iniciamos el FormGroup junto con sus validaciones, dentro de nuestro template
   * hacemos la asginación de cada FormControl y desactivamos el boton de submit
   * mientras el formulario no sea válido, se usan las constantes como Regex en los patterns
   */
  ngOnInit(): void {
    this.productsForm = new FormGroup({
      id_order: new FormControl('', {
        validators: [Validators.required],
      }),
      value_unit: new FormControl('', {
        validators: [Validators.required, Validators.pattern(Constants.Pattern.Form.Decimal)],
      }),
      unit: new FormControl('', {
        validators: [Validators.required],
      }),
      description: new FormControl('', {
        validators: [Validators.required, Validators.pattern(Constants.Pattern.Form.Content)],
      }),
      sku: new FormControl('', {
        validators: [Validators.required, Validators.pattern(Constants.Pattern.Only.OnlyLettersAndNumbers)],
      }),
      quantity: new FormControl('', {
        validators: [Validators.required],
      }),
      qty_box: new FormControl('', {
        validators: [Validators.required],
      }),
      weight: new FormControl('', {
        validators: [Validators.required, Validators.pattern(Constants.Pattern.Form.Decimal)],
      }),
      product_mark: new FormControl('', {
        validators: [Validators.required, Validators.pattern(Constants.Pattern.Form.ProductMark)],
      }),
      status: new FormControl('', {
        validators: [Validators.required],
      }),
    }, {updateOn: 'change'})
    this.setValue()
  }

  /**
   * Realizamos los Get para obtener cada valor específico del FormGroup y poder hacer validaciones
   * desde nuestro html para los distintos casos invalidos
   */
  get idOrder() {
    return this.productsForm.get('id_order');
  }

  get valueUnit() {
    return this.productsForm.get('value_unit');
  }

  get unit() {
    return this.productsForm.get('unit');
  }

  get description() {
    return this.productsForm.get('description');
  }

  get sku() {
    return this.productsForm.get('sku');
  }

  get quantity() {
    return this.productsForm.get('quantity');
  }

  get qtyBox() {
    return this.productsForm.get('qty_box');
  }

  get weight() {
    return this.productsForm.get('weight');
  }

  get productMark() {
    return this.productsForm.get('product_mark');
  }

  get status() {
    return this.productsForm.get('status');
  }

  /**
   * Finalización de los Get para los FormControl
   */


  /**
   * Creamos el metodo setValue con la funcionalidad de setear nuestro FormGroup al momento de editar un registro
   * Si estamos creando un producto nuevo, le asignamos el ID que recibimos de los parametros en la ruta
   * Se hace un llamado a este metodo cada vez que se inicia el modal en modo Update
   */
  setValue() {
    if (this.modal === "Update") {
      setTimeout(() => {
        this.productsForm.setValue({
          id_order: this.orderId,
          value_unit: this.product.ValueUnit,
          unit: this.product.Unit,
          description: this.product.Description,
          sku: this.product.SKU,
          quantity: this.product.Quantity,
          qty_box: this.product.QtyBox,
          weight: this.product.Weight,
          product_mark: this.product.Mark,
          status: this.product.Status
        })
      }, 500);
    } else {
      this.productsForm.controls['id_order'].setValue(this.orderId)
    }
  }

  /**
   * Metodo que se encarga de emitir los eventos al momento de hacer un submit del formulario
   * Estos eventos envian la información necearia para cada servicio que realizara modificaciones en la API
   */
  onSubmit(): void {
    if (this.modal === "Create") {
      this.created.emit(this.productsForm.value)
    } else {
      this.updated.emit({IdOrderProducts: this.product.IdOrdersProducts, data: this.productsForm.value})
    }
  }

  /**
   * Metodo para emitir un evento que avise al componente padre y este pueda desmontar el componente del Modal
   */
  close(): void {
    this.closed.emit()
  }
}
