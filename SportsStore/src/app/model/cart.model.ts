import { Injectable } from '@angular/core';
import { Product } from './product.model';


@Injectable()
export class Cart {

  public cartLines: CartLine[] = [];
  public itemsCount: number = 0;
  public cartPrice: number = 0;

  addLine(prod: Product, quant: number = 1){
    // let specLine: any = this.cartLines.find( cartLine => cartLine.product.id == prod.id );
    // if(specLine =! undefined){
    //   specLine.quantity += quant;
    // } else {
    //   this.cartLines.push(new CartLine(prod,quant));
    // }
    // this.recalculate();
    // console.log("One item added");
    // let specIndex = Number(this.cartLines.findIndex( cartLine => cartLine.product.id == prod.id ));
    let specIndex = this.cartLines.findIndex( cartLine => cartLine.product.id == prod.id );
    if(specIndex >= 0){
      this.cartLines[specIndex].quantity += quant;
    } else {
      this.cartLines.push(new CartLine(prod,quant));
    }
    this.recalculate();
    console.log(specIndex);
  }

  private recalculate(){
    this.itemsCount = 0;
    this.cartPrice = 0;
    this.cartLines.forEach( cartLine => {
      this.itemsCount += cartLine.quantity;
      this.cartPrice += cartLine.product.price * cartLine.quantity;
    } );
  }

  updateQuantity(prod: Product, quant: number){
    // Adam does a mistake here. Lets use the findIndex method
    // let specLine = this.cartLines.find( cartLine => cartLine.product.id == prod.id );
    // if( specLine =! undefined ){
    //   specLine.quantity = Number(quant);
    // }
    // this.recalculate();
    let specLineIndex = this.cartLines.findIndex( cartLine => cartLine.product.id == prod.id );
    if(specLineIndex >= 0){
      this.cartLines[specLineIndex].quantity = Number(quant);
    }
    this.recalculate();
  }

  removeCartLine(id: number) {
    let specIndex = this.cartLines.findIndex( cartLine => cartLine.product.id == id );
    this.cartLines.splice(specIndex,1);
    this.recalculate();
  }

  clear(){
    this.cartLines = [];
    this.itemsCount = 0;
    this.cartPrice = 0;
  }

}

export class CartLine {

  constructor(public product: Product, public quantity: number){}

  get lineTotal(): number {
    return this.product.price * this.quantity;
  }

}
