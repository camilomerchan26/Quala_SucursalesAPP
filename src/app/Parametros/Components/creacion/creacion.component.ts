import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ParametrosService } from '../../Services/Parametros.service';
import { ToastrService } from 'ngx-toastr';
import { EntidadCrear } from '../../Entities/EntidadCrear';
import { AdminRespuestaCrear } from '../../Entities/AdminRespuestaCrear';
import { ListaMoneda } from '../../Entities/ListaMoneda';

@Component({
  selector: 'app-creacion',
  templateUrl: './creacion.component.html',
  styleUrls: ['./creacion.component.scss']
})
export class CreacionComponent {

  select!: string;
  listaCrear: EntidadCrear[] = [];
  formReporte !: FormGroup;
  submitted = false;
  showTable: Boolean = true;
  listoMonedas: ListaMoneda[] = [];
  showFormMonedas: boolean = true;
   
 
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private _Creacion: ParametrosService,
    private toastr: ToastrService,
    
    

  ){
    this.formReporte = this.formBuilder.group({
      descripcion: ['', [Validators.required]], // Define todos los campos y validadores necesarios
      identificacion: ['', [Validators.required]],
      idCiudad: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      idMoneda: ['', [Validators.required]],
    
  })
  }

  ngOnInit(): void {
    
    this.route.queryParamMap.subscribe(params => {
    });
    this.getlistamonedas();

    

  } 

  get formulario(): { [key: string]: AbstractControl } {

    return this.formReporte.controls;

  }
  public crear(): void {
    debugger;
    this.select = 'crear';
  }

  public onSubmitCrear(): void {
    if (this.select == 'Limpiar') {
      window.location.reload();
      return;
    }

    if (this.select == 'crear') {
      this.submitted = true;

      if (this.formReporte.valid) {
        const entidadCrear: any = {

          descripcion: this.formReporte.get('descripcion')?.value,
          identificacion: this.formReporte.get('identificacion')?.value,
          idCiudad: this.formReporte.get('idCiudad')?.value,
          direccion: this.formReporte.get('direccion')?.value,
          telefono: this.formReporte.get('telefono')?.value,
          idMoneda: this.formReporte.get('idMoneda')?.value,
        }

        this.create(entidadCrear);
      }
    }
  }


create(entidadCrear: EntidadCrear) {
  debugger;
  entidadCrear.idMoneda =this.formReporte.get('idMoneda')?.value;
  this._Creacion.GetCrear(entidadCrear).subscribe((data:any) => {
       
    
    console.log(this.listaCrear);
    if(data.estado){
      this.listaCrear = data;
      this.toastr.info(data.msn,'Alerta');
        
    }
    else{
      this.toastr.error(data.msn,'Alerta');
    }
    
    this.clearForm();
    this.showTable = true;
    
 
});

}

clearForm(){
  this.formReporte.reset();
  
}

getlistamonedas() {
debugger;
  const EntidadListaMoneda: any = {
    id: "",
    nombreMoneda: "",
    
  }
  this._Creacion.Getlista(EntidadListaMoneda).subscribe(data => {

      this.listoMonedas = data
   
  })

}

}
