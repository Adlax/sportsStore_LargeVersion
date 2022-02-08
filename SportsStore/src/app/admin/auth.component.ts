import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../model/auth.service';

@Component({
  templateUrl: 'auth.component.html'
})
export class AuthComponent {

  public userName: string;
  public userPasswd: string;
  public errorMessage: string;

  constructor(private router: Router, private auth: AuthService){

  }

  authenticate(form: NgForm){
    if(form.valid){
      this.auth.authenticate(this.userName,this.userPasswd).subscribe( resp => {
        if(resp){
          this.router.navigateByUrl('/admin/main');
        } else {
          this.errorMessage = "Wrong credentials";
        }
      } );
    } else {
      this.errorMessage = "Form invalid";
    }
  }

}
