import { Component } from '@angular/core';
import { ProductRepository } from '../model/product.repository';
import { Product } from '../model/product.model';
import { Cart } from '../model/cart.model';
import { Router } from '@angular/router';

@Component({
  selector: "store",
  templateUrl: "store.component.html",
})
export class StoreComponent {

  public selectedCategory = null;
  public selectedPage = 1;
  public productsPerPage = 4;

  constructor(private repo: ProductRepository,private cart: Cart,private router: Router){}

  get products(): Product[] {
    let pageIndex = (this.selectedPage-1)*this.productsPerPage;
    return this.repo.getProducts(this.selectedCategory).slice(pageIndex,pageIndex+this.productsPerPage);
  }

  get categories(): (string | undefined)[] {
    return this.repo.getCategories();
  }

  changeCategory(newCat?: any) {
    this.selectedCategory = newCat;
  }

  changePageSize(newSize: number) {
    this.productsPerPage = Number(newSize);
    this.selectedPage = 1;
  }

  changePage(newPage: number) {
    this.selectedPage = newPage;
  }

  // get pageCount(): number {
  //   return Math.ceil(this.repo.getProducts(this.selectedCategory).length/this.productsPerPage);
  // }

  get pageNumbers(): number[] {
    return Array(Math.ceil(this.repo.getProducts(this.selectedCategory).length/this.productsPerPage)).fill(0).map( (x,i)=>i+1 );
  }

  addProductToCart(prod: Product) {
    this.cart.addLine(prod);
    this.router.navigateByUrl("/cart");
  }

}
