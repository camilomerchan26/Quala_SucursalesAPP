import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModalDismissReasons, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ParametrosService } from '../../Services/Parametros.service';
import { EntidadInactivar } from '../../Entities/EntidadInactivar';
import { AdminRespuestaCrear } from '../../Entities/AdminRespuestaCrear';
import { EntidadEditar } from '../../Entities/EntidadEditar';
import { EntidadSucursalOut } from '../../Entities/EntidadSucursalOut';
import { ListaMoneda } from '../../Entities/ListaMoneda';


@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})

export class CrudComponent {
  select!: string;
  listaSucursal: EntidadSucursalOut[] = [];
  Eliminar:EntidadInactivar[]=[];
  tableshow!: boolean;
  showTable = true;
  eliminacionExitosa= false;
  formReporte !: FormGroup;
  editOneForm !: FormGroup;
  submitted = false;
  EntidadEditar!:EntidadEditar;
  viewDetailsForm !: FormGroup;
  modalref!: NgbModalRef;
  closeResult: string = '';
  EditId_Sucursal!: number;
  listoMonedas: ListaMoneda[] = [];
  

  settings = {
    actions: {
      position: 'right',
      add: false,
      edit: true,
      delete: true,
      editable: false       
      

    },
    mode: 'external',

    edit: {
      editButtonContent: '<i class="btn btn-primary">Editar</i>',
      position: 'center',

    },
    delete: {
      deleteButtonContent: '<i class="btn btn-danger">Eliminar</i>',
      position: 'center',
    },

    columns: {
      codigo: {
        title: 'Codigo',
        filter: false,
        
      },
      descripcion: {
        title: 'Descripcion',
        filter: false,
        
      },
      identificacion: {
        title: 'Identificacion',
        filter: false,
        
      },
      estado: {
        title: 'Estado',
        filter: false,
      },
      nombreCiudad: {
        title: 'Ciudad',
        filter: false,
      },
      direccion: {
        title: 'Direccion',
        filter: false,
      },
    
      telefono: {
        title: 'Telefono',
        filter: false,
      },
      nombreMoneda: {
        title: 'Moneda',
        filter: false,
      },
      fechaCreacion: {
        title: 'Fecha Creación',
        filter: false,
      },
      fechaModificacion: {
        title: 'Fecha Modificación',
        filter: false,
      },
    },
  }

  
  @ViewChild('modalContent', { static: false }) modalContent!: ElementRef;
  @ViewChild('viewContent', { static: false }) viewContent!: ElementRef;
  @Output() close = new EventEmitter<boolean>();
  @Input() closeModalInAcceptEvent: boolean = true;
  @Output() dismiss = new EventEmitter<boolean>();
  @Output() accept = new EventEmitter<boolean>();

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private _Crud: ParametrosService,
    private toastr: ToastrService,
 
  ){
    this.formReporte = this.formBuilder.group({
      
    })
  
    this.viewDetailsForm = this.formBuilder.group({
      codigo: [{ value: null, enable: false }],
      descripcion: [{ value: '', enable: true }],
      identificacion: [{ value: '', enable: true }],
      estado: [{ value: null, enable: true }],
      idCiudad: [{ value: '', enable: true }],
      direccion: [{ value: null, enable: true }],
      telefono: [{ value: null, enable: true }],
      idMoneda: [{ value: null, enable: true }],
      
    });
  }


  ngOnInit(): void {
    
    this.route.queryParamMap.subscribe(params => {
    });
  } 

  get formulario(): { [key: string]: AbstractControl } {
    return this.formReporte.controls;
  }
  public consultar(): void {
    this.select = 'consultar';
  }
  public onSubmitConsultar(): void {
    if (this.select == 'Limpiar') {
      window.location.reload();
    }

    if (this.select == 'consultar') {

      this.submitted = true;
      if (this.formReporte.valid) {
        let  IdSucursal = 0;
        this.GetTable(IdSucursal);
      }
    }
  }

  GetTable(IdSucursal) {
    debugger;
    this._Crud.GetSucursales(IdSucursal).subscribe((data:any) => {
        this.showTable = true;
        this.tableshow = true;
        this.listaSucursal = data;
        console.log(this.listaSucursal);
      }
    )
  }
  
  eliminar(IdSucursal:any) {
    var borrado = IdSucursal.data.codigo;
    debugger;
  
    this._Crud.Inactivar(borrado).subscribe((data: AdminRespuestaCrear) => {
      debugger;
      if (data.estado) {
        this.toastr.info(data.msn,'Alerta');
        
      } else {
        this.toastr.error(data.msn,'Alerta');
      }
      debugger;
      this.GetTable(0);
    });
   }

  editar(event:any) {
 
    debugger; 
    this.EntidadEditar =Object.assign(new EntidadEditar(),event.data); 
     this.viewDetailsForm.controls['codigo'].setValue(this.EntidadEditar.codigo);
     this.viewDetailsForm.controls['descripcion'].setValue(this.EntidadEditar.descripcion);
     this.viewDetailsForm.controls['identificacion'].setValue(this.EntidadEditar.identificacion);
     this.viewDetailsForm.controls['estado'].setValue(this.EntidadEditar.estado);
     this.viewDetailsForm.controls['idCiudad'].setValue(this.EntidadEditar.idCiudad);
     this.viewDetailsForm.controls['direccion'].setValue(this.EntidadEditar.direccion);
     this.viewDetailsForm.controls['idMoneda'].setValue(this.EntidadEditar.idMoneda);
     this.viewDetailsForm.controls['telefono'].setValue(this.EntidadEditar.telefono);
 
    this.openViewRowSelect();  
  }

  openViewRowSelect() {
    this.getlistamonedas();

   this.modalref = this.modalService.open(this.modalContent, {ariaLabelledBy: 'modal-basic-title'});
   this.modalref.result.then((result) => {
     this.closeResult = `Closed with: ${result}`;
   }, (reason) => {
     this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
   });
 }
 
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  closeModal() {
    this.modalref.close();
    this.close.emit();
  }
  dismissModal() {
    this.modalref.close();
    this.dismiss.emit();
  }
  acceptModal() {
    debugger;
    let edit = new EntidadEditar();    
    let data2 = new  Array<EntidadEditar>();
      edit.codigo = this.viewDetailsForm.value.codigo;
      edit.descripcion = this.viewDetailsForm.value.descripcion;
      edit.direccion = this.viewDetailsForm.value.direccion;
      edit.estado =this.viewDetailsForm.value.estado;
      edit.idCiudad =this.viewDetailsForm.value.idCiudad;
      edit.idMoneda =this.viewDetailsForm.value.idMoneda;
      edit.telefono =this.viewDetailsForm.value.telefono;
      edit.identificacion =this.viewDetailsForm.value.identificacion;
      
      this._Crud.GetEditar(edit).subscribe(data =>{
        debugger;
        this.toastr.success(data.msn);
        this.modalref.close();
        this.GetTable(0);

      });
    
  }  
  getlistamonedas() {
    debugger;
      const EntidadListaMoneda: any = {
        id: "",
        nombreMoneda: "",
        
      }
      this._Crud.Getlista(EntidadListaMoneda).subscribe(data => {
    
          this.listoMonedas = data
       
      })
    
    }
}


