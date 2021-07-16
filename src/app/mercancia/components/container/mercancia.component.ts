import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/usuarios/components/container/usuario.model';
import Swal from 'sweetalert2';
import { Mercancia } from './mercancia.model';
import { MercanciaService } from './mercancia.service';

@Component({
  selector: 'app-mercancia',
  templateUrl: './mercancia.component.html',
  styleUrls: ['./mercancia.component.scss']
})
export class MercanciaComponent implements OnInit {

  mercancias: Mercancia[]=[];
  nombreBuscar!: string;

  constructor(private mercanciaService:MercanciaService) { }

  ngOnInit(): void {
    this.mercanciaService.getMercancia().subscribe(
      mercancias => this.mercancias = mercancias
    );
  }
  
  delete(mercancia: Mercancia):void{
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Esta seguro?',
      text: `¿Seguro que desea eliminar la mercancia ${mercancia.nombre} ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.mercanciaService.delete(mercancia.id).subscribe(
          response =>{
            this.mercancias = this.mercancias.filter(mer => mer !== mercancia);
            swalWithBootstrapButtons.fire(
              'Mercancia Eliminada!',
              `Mercancia ${mercancia.nombre} eliminada con exito.`,
              'success'
            );
          });
        
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'La mercancia esta a salvo :)',
          'error'
        )
      }
    })
  }

  buscarMercancia(){

    if(this.nombreBuscar){
      this.mercanciaService.getMercanciaByNombre(this.nombreBuscar).subscribe(
        response => this.mercancias=response
      );
    }else{
      this.mercanciaService.getMercancia().subscribe(
        mercancias => this.mercancias = mercancias
      );
    }
    
  }

}
