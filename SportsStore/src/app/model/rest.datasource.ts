import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './product.model';
import { Order } from './order.model';
import { map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';

const PROTOCOL = "http";
const PORT = 3500;

@Injectable()
export class RestDataSource {

  baseUrl: string;
  auth_token: string;

  constructor(private http: HttpClient){
    this.baseUrl = `${PROTOCOL}://${location.hostname}:${PORT}/`;
  }

  private getOptions() {
    return { headers: new HttpHeaders({"Authorization":`Bearer<${this.auth_token}>`}) };
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl + 'products');
  }

  saveProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl+'products', product, this.getOptions());
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.baseUrl}products/${product.id}`, product, this.getOptions());
  }

  deleteProduct(id: number): Observable<Product> {
    return this.http.delete<Product>(`${this.baseUrl}products/${id}`,this.getOptions());
  }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.baseUrl+'orders', this.getOptions());
  }

  updateOrder(order: Order): Observable<Order> {
    return this.http.put<Order>(`${this.baseUrl}orders/${order.id}`, order , this.getOptions());
  }

  deleteOrder(id: number): Observable<Order> {
    return this.http.delete<Order>(`${this.baseUrl}/orders/${id}`, this.getOptions());
  }

  saveOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(this.baseUrl + 'orders', order);
  }

  authenticate(userName: string, userPasswd: string): Observable<boolean> {
    return this.http.post<any>(this.baseUrl+'login',{name: userName,password:userPasswd}).pipe( map(response=>{
      this.auth_token = response.success ? response.token : null;
      return response.success;
    }) );
  }

}
