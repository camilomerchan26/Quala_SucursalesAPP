import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { CommonModule } from '@angular/common';
import { ParametrosRoutingModule } from '../Routing/Parametros-routing.module';
import { NgbDatepicker, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ParametrosService } from '../Services/Parametros.service';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import {
  BarcodeScannerLivestreamModule,
  BarcodeScannerLivestreamOverlayModule
} from 'ngx-barcode-scanner';

import { WebcamModule } from 'ngx-webcam';

import { CrudComponent } from '../Components/crud/crud.component';
import { CreacionComponent } from '../Components/creacion/creacion.component';





@NgModule({

  imports: [
    CommonModule,
    ParametrosRoutingModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    Ng2SmartTableModule,
    NgbModule,
    FormsModule,
    WebcamModule
  ],
  
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
   
  ],
  
  declarations: [

  

    CrudComponent,
    CreacionComponent
    
     ],
  
     providers: [ParametrosService, CurrencyPipe],
  
})
export class ParametrosModule { }


