import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Cargo } from '../container/cargo.model';
import { CargoService } from '../container/cargo.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  public cargo:Cargo = new Cargo();
  public titulo:string="Modulo de Cargos";
  constructor(private cargoService:CargoService,private reouter:Router,private activateRout:ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarCargo();
  } 

  cargarCargo(): void{
    this.activateRout.params.subscribe(params => {
      let id = params['id']
      if(id){
        this.cargoService.getCargo(id).subscribe(
          (cargo)=>this.cargo=cargo
          
        );
      };
    });
  }

  create(): void{
    this.cargoService.create(this.cargo)
    .subscribe(cargo => {
      this.reouter.navigate(['/cargos'])
      Swal.fire('Nuevo Cargo',`Cargo ${cargo.nombre} creado con exito!`,'success')
    }); 
  }

  update():void{
    this.cargoService.update(this.cargo)
    .subscribe( cargo => {
      this.reouter.navigate(['/cargos'])
      Swal.fire('Cargo Actualizado', `Cargo ${cargo.nombre} actualizado con exito!`, 'success')
    });
  }
}
