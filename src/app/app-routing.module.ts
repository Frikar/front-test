import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OrdersComponent} from "./components/orders/orders.component";
import {ProductsComponent} from "./components/products/products.component";

/**
 * Importamos las rutas necesarias para el CRUD
 *
 */
const routes: Routes = [
  {path: '', component: OrdersComponent},
  {path: 'order/:id', component: ProductsComponent},
  {path: '**', component: OrdersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled',
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
