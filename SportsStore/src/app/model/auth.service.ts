import { Injectable } from '@angular/core';
import { RestDataSource } from './rest.datasource';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {

  constructor(private dataSource: RestDataSource){
  }

  authenticate(userName: string, userPasswd: string): Observable<boolean> {
    return this.dataSource.authenticate(userName,userPasswd);
  }

  get authenticated(): boolean {
    return (this.dataSource.auth_token != null);
  }

  clear() {
    this.dataSource.auth_token = null;
  }

}
