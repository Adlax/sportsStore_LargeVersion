import { Injectable } from '@angular/core';
import { Product } from './product.model';
import { Observable, from } from 'rxjs';
import { Order } from './order.model';

@Injectable()
export class StaticDataSource {

  private products: Product[] = [
    new Product(1,"Prod1","Cat1","Produit1 de la Cat1",100),
    new Product(2,"Prod2","Cat1","Produit2 de la Cat1",100),
    new Product(3,"Prod3","Cat1","Produit3 de la Cat1",100),
    new Product(4,"Prod4","Cat1","Produit4 de la Cat1",100),
    new Product(5,"Prod5","Cat1","Produit5 de la Cat1",100),
    new Product(6,"Prod6","Cat2","Produit6 de la Cat2",100),
    new Product(7,"Prod7","Cat2","Produit7 de la Cat2",100),
    new Product(8,"Prod8","Cat2","Produit8 de la Cat2",100),
    new Product(9,"Prod9","Cat2","Produit9 de la Cat2",100),
    new Product(10,"Prod10","Cat2","Produit10 de la Cat2",100),
    new Product(11,"Prod11","Cat3","Produit11 de la Cat3",100),
    new Product(12,"Prod12","Cat3","Produit12 de la Cat3",100),
    new Product(13,"Prod13","Cat3","Produit13 de la Cat3",100),
    new Product(14,"Prod14","Cat3","Produit14 de la Cat3",100),
    new Product(15,"Prod15","Cat3","Produit15 de la Cat3",100),
  ];

  getProducts(): Observable<Product[]>{
    return from([this.products]);
  }

  saveOrder(order: Order): Observable<Order> {
    console.log(JSON.stringify(order));
    return from([order]);
  }

}
