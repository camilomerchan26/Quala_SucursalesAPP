import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [

 
  {
    path: '',
    loadChildren: () => import('./Parametros/Module/Parametros.module').then(m => m.ParametrosModule)
    },


];

@NgModule({  
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  imports: [RouterModule.forRoot(routes), NgbModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
