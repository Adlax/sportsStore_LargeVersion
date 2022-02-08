import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductRepository } from '../model/product.repository';
import { NgForm } from '@angular/forms';
import { Product } from '../model/product.model';

@Component({
  templateUrl: 'productEditor.component.html'
})
export class ProductEditorComponent {

  editing: boolean = false;
  product: Product = new Product();

  constructor(private router: Router, private activeRoute: ActivatedRoute, private productRepo: ProductRepository){
    this.editing = activeRoute.snapshot.params['mode']=='edit';
    if(this.editing){
      Object.assign(this.product,productRepo.getProduct(activeRoute.snapshot.params['id']));
    }
  }

  save(form: NgForm) {
    this.productRepo.saveProduct(this.product);
    this.router.navigateByUrl('/admin/main/products');
  }

}
