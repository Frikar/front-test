/**
 * Constantes que pueden ser reutilizadas en las validaciones
 *
 */
export class Constants {
  public static Pattern = {
    Form: {
      Name: /^[A-Za-zéáíóúÁÉÍÓÚñÑ'\\\s]/,
      Content: /^[A-Za-zéáíóúÁÉÍÓÚñÑ'\\\s]/,
      ProductMark: /^[a-zA-Z0-9 ]*$/,
      Email: /^(([a-zA-Z0-9]([\.\-\_]){1})|([a-zA-Z0-9]))+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4}|[a-zA-Z]{1,3}\.[a-zA-Z]{1,3})$/,
      Decimal: /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/
    },
    Only: {
      OnlyLetters: /^[a-zA-Z]'/,
      OnlyNumber: /^[0-9]*$/,
      OnlyLettersAndNumbers: /^\w+$/
    }
  };
}
