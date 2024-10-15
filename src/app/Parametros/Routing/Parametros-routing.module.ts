import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrudComponent } from '../Components/crud/crud.component';
import { CreacionComponent } from '../Components/creacion/creacion.component';

const ParametrosRoutes: Routes = [


  { path:'crud',component:CrudComponent},
  { path:'crud/creacion',component:CreacionComponent}


];

@NgModule({
  imports: [RouterModule.forChild(ParametrosRoutes)],
  exports: [RouterModule]
})
export class ParametrosRoutingModule { }