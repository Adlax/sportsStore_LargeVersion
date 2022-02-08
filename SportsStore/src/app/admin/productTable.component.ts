import { Component } from '@angular/core';
import { ProductRepository } from '../model/product.repository';
import { Product } from '../model/product.model';

@Component({
  templateUrl: 'productTable.component.html'
})
export class ProductTableComponent {

  constructor(private productRepo: ProductRepository){

  }

  getProducts(): Product[] {
    return this.productRepo.getProducts();
  }

  deleteProduct(id: number) {
    this.productRepo.deleteProduct(id);
  }

}
