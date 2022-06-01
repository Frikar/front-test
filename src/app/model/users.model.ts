/* Custom Type para asignar los valores que puede recibir un User */
export type User = {
  IdUser: number,
  Name: string,
  Email: string
  Status: string
}

/* Modelos para obtener la lista de los usuarios */
export interface Users {
  status: number,
  message: string,
  data: User[]
}
