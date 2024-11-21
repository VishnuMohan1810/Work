import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { IndexComponent } from './index/index.component';

const routes: Routes = [
  {path:'reg',component:RegisterComponent},
  {path:'log',component:LoginComponent},
  {path:'index',component:IndexComponent},
  // {path:'bloglist',component:BloglistComponent},
  // {path:'blogadd',component:BlogaddComponent}
  // {path:'blogs/:id',component:BloglistComponent},
  // {path:'blogs/create',component:blo}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
