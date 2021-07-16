import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Cargo } from './cargo.model';
import { CargoService } from './cargo.service';

@Component({
  selector: 'app-cargos',
  templateUrl: './cargos.component.html'
})
export class CargosComponent implements OnInit {

  cargos: Cargo[]=[];

  constructor(private cargoService: CargoService) {  }

  ngOnInit(): void {
    this.cargoService.getCargos().subscribe(
      cargos => this.cargos = cargos
    );
  }

  delete(cargo: Cargo):void{
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Esta seguro?',
      text: `¿Seguro que desea eliminar el cargo ${cargo.nombre} ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.cargoService.delete(cargo.id).subscribe(
          response =>{
            this.cargos = this.cargos.filter(car => car !== cargo);
            swalWithBootstrapButtons.fire(
              'Cargo Eliminado!',
              `Cargo ${cargo.nombre} eliminado con exito.`,
              'success'
            );
          });
        
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'El cargo esta a salvo :)',
          'error'
        )
      }
    })
  }


}
