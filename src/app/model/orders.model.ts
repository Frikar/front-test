/* Custom Type para asignar los valores que puede recibir una Order */
export type Order = {
  IdOrder: number,
  IdUser: number,
  OrderNumber: number;
  DateTime: string;
  ProviderName: string;
  DateCreated: string
  Observation: string,
  TotalValue: number,
  Status: string
}

/* Modelo para realizar las operaciones en el CRUD de Órdenes */
export interface Orders {
  status: number,
  message: string,
  data: Order[]
}

/* Modelo especificó para la funcionalidad de Update */
export interface OrderUpdate {
  IdOrder: number,
  data: {}
}
