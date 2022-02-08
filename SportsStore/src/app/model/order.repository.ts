import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from './order.model';
//import { StaticDataSource } from './static.datasource';
import { RestDataSource } from './rest.datasource';

@Injectable()
export class OrderRepository {

  private orders: Order[] = [];
  private loaded: boolean = false;

  constructor(public dataSource: RestDataSource){

  }

  loadOrders() {
    this.loaded = true;
    this.dataSource.getOrders().subscribe( orders => {
      this.orders = orders;
    } );
  }

  getOrders(): Order[] {
    if(!this.loaded){
      this.loadOrders();
    }
    return this.orders;
  }

  saveOrder(order: Order): Observable<Order> {
    return this.dataSource.saveOrder(order);
  }

  updateOrder(order: Order) {
    this.dataSource.updateOrder(order).subscribe( order => {
      let specIndex = this.orders.findIndex( ord => ord.id==order.id );
      this.orders.splice(specIndex, 1, order);
    } );
  }

  deleteOrder(id: number) {
    this.dataSource.deleteOrder(id).subscribe( ord => {
      let specIndex = this.orders.findIndex( ord => ord.id==id );
      this.orders.splice(specIndex, 1);
    } );
  }

}
