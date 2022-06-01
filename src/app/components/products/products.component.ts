import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProductsService} from "../../services/products.service";
import {Product, Products, ProductUpdate} from "../../model/product.model";
import {faPlusCircle, faSearch, faEdit, faArrowAltCircleLeft} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  faPlusCircle = faPlusCircle;
  faEdit = faEdit;
  faSearch = faSearch;
  faArrow = faArrowAltCircleLeft;
  products: Product[] = []
  modal: string = "Create";
  loaded: boolean = false;
  product!: Product;
  idOrder!: number;

  constructor(private route: ActivatedRoute, private productService: ProductsService) {
  }

  /**
   * Iniciamos la obtención de parametros en nuestra ruta para filtrar los productos
   * Recomendación: Debería crearse un metodo en la API que realice esta función
   */
  ngOnInit(): void {
    this.route.queryParams.subscribe(() => {
      this.idOrder = this.route.snapshot.params['id']
    })
    this.getProducts(this.idOrder)
  }

  /**
   * Creamos el metodo que se encargara de filtrar y actualizar
   * la información desde nuestra API
   */
  getProducts(id: number) {
    this.productService.getAllData().subscribe((values: Products) => {
      this.products = values.data.filter((x: any) => x.IdOrder == id)
    })
  }

  /**
   * El metodo getProduct sirve para obtener el item específico que será manejado en el modal para editar
   */
  getProduct(id: number): void {
    this.productService.getData(id).subscribe(value => {
      this.product = value.data
    })
  }

  /**
   * Creamos el metodo para añadir un nuevo producto y luego actualizamos la data
   */
  createProduct(value: {}): void {
    this.productService.postData(value).subscribe(() => {
      this.getProducts(this.idOrder)
    })
    this.modalEvent()
  }

  /**
   * Este metodo nos permite hacer ediciones de un registro,
   * recibe una interfaz con los valores necesarios para realizar el PUT
   */
  updateProduct(value: ProductUpdate): void {
    this.productService.updateData(value.data, value.IdOrderProducts).subscribe(() => {
      this.getProducts(this.idOrder)
    })
    this.modalEvent()
  }

  /**
   * Metodo para borrar un registro al ser llamado por un evento click
   */
  deleteProduct(id: number): void {
    this.productService.deleteData(id).subscribe(() => {
      this.getProducts(this.idOrder)
    })
  }


  /**
   * modalEvent es un metodo que permite desmontar el componente del modal en el DOM
   */
  modalEvent(): void {
    this.loaded = !this.loaded;
  }

  /**
   * Este metodo asigna la opción para crear un registro usando un mismo componente de modal
   */
  changeModalCreate(): void {
    this.modal = "Create"
    this.loaded = true
  }

  /**
   * updateModal recibe un ID con el cual obtiene el objeto editable y carga el componente de modal compartido
   */
  updateModal(id: number): void {
    this.modal = "Update"
    this.getProduct(id)
    this.loaded = true
  }
}
