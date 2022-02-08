import { Component } from '@angular/core';
import { Order } from '../model/order.model';
import { OrderRepository } from '../model/order.repository';
import { NgForm } from '@angular/forms';

@Component({
  selector: "checkout",
  templateUrl: "checkout.component.html",
  styleUrls: ['checkout.component.css'],
})
export class CheckoutComponent {

  orderSent: boolean = false;
  orderSubmited: boolean = false;

  constructor(public order: Order, public repo: OrderRepository){

  }

  submitOrder(form: NgForm) {
    this.orderSubmited = true;
    if(form.valid){
      this.repo.saveOrder(this.order).subscribe( order => {
        this.order.clear();
        this.orderSent = true;
        this.orderSubmited = false;
      } );
    }
  }


}
