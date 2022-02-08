import { Component } from '@angular/core';
import { Order } from '../model/order.model';
import { OrderRepository } from '../model/order.repository';

@Component({
  templateUrl: 'orderTable.component.html'
})
export class OrderTableComponent {

  includeShipped: boolean = false;

  constructor(private orderRepo: OrderRepository){

  }

  getOrders(): Order[] {
    return this.orderRepo.getOrders().filter( ord => this.includeShipped || !ord.shipped );
  }

  markShipped(order: Order) {
    order.shipped = true;
    this.orderRepo.updateOrder(order);
  }

  deleteOrder(id: number) {
    this.orderRepo.deleteOrder(id);
  }

}
