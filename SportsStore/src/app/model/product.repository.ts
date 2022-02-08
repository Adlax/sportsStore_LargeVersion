import { Injectable } from '@angular/core';
//import { StaticDataSource } from './static.datasource';
import { RestDataSource } from './rest.datasource';
import { Product } from './product.model';

@Injectable()
export class ProductRepository {

  private products: Product[] = [];
  private categories: (string | undefined)[] = [];

  constructor(private dataSource: RestDataSource){
    this.dataSource.getProducts().subscribe( data => {
      this.products = data;
      //console.log(this.products.length);
      this.categories = data.map( prod => prod.category ).filter( (cat,index,array) => array.indexOf(cat)==index ).sort();
    } );
  }

  getProducts(category?: any): Product[] {
    return this.products.filter( prod => category==null || prod.category==category )
  }

  getProduct(id: number): Product | undefined {
    return this.products.find( prod => prod.id==id );
  }

  getCategories(): (string | undefined)[] {
    return this.categories;
  }

  saveProduct(product: Product) {
    if(product.id==null || product.id==0){
      this.dataSource.saveProduct(product).subscribe( prod => {
        this.products.push(prod);
      } );
      console.log(JSON.stringify(this.products));
    } else {
      this.dataSource.updateProduct(product).subscribe( prod => {
        let specIndex = this.products.findIndex( prod => prod.id==product.id );
        this.products.splice(specIndex, 1, product);
      } );
    }
  }

  deleteProduct(id: number) {
    this.dataSource.deleteProduct(id).subscribe( prod => {
      let specIndex = this.products.findIndex( prod => prod.id==id );
      this.products.splice(specIndex, 1);
    } );
  }

}
