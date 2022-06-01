/* Custom Type para asignar los valores que puede recibir un Producto */
export interface Product {
  IdOrdersProducts: number,
  IdOrder: number,
  ValueUnit: number,
  Unit: string,
  Description: string,
  SKU: string,
  Quantity: number,
  QtyBox: number,
  Weight: number,
  Mark: string,
  Status: string
}

/* Modelo para realizar las operaciones en el CRUD de Productos */
export interface Products {
  status: number,
  message: string,
  data: Product[]
}

/* Modelo especificó para la funcionalidad de Update */
export interface ProductUpdate {
  IdOrderProducts: number,
  data: {}
}
