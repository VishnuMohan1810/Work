import { Component } from '@angular/core';
import { MediatorService } from '../mediator.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(public c:MediatorService,public r:Router){}
  login(data:any){
    console.log(data)
    this.c.loginuser(data).subscribe(
      (res:any)=>{
        console.log(res)
        if (res['status']==1){
          alert("success")
          console.log(res['values'])
          this.r.navigate(['index'], { 
            queryParams: res['values']
          });
        }
        else if (res["status"]==2){
          alert('failed')
        }
        else{
        alert("already exists")
      }
      }
    )
  }
}



