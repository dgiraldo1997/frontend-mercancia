import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { Cargo } from 'src/app/cargos/components/container/cargo.model';
import { CargoService } from 'src/app/cargos/components/container/cargo.service';
import Swal from 'sweetalert2';
import { Usuario } from '../container/usuario.model';
import { UsuarioService } from '../container/usuario.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  public usuario:Usuario = new Usuario();
  public titulo:string="Modulo de Usuario";
  cargos: Cargo[]=[];

  constructor(private usuarioService:UsuarioService,private reouter:Router,private activateRout:ActivatedRoute,
     private cargoService: CargoService) { }

  ngOnInit(): void {
      this.getCargos();
      this.cargarUsuario();
  }

  cargarUsuario(): void{
    this.activateRout.params.subscribe(params => {
      let id = params['id']
      if(id){
        this.usuarioService.getUsuarios(id).subscribe(
          (usuario)=>{
            this.usuario=usuario;
            this.usuario.idcargo=usuario.cargo.id;
          }
        );
      };
    });
  }

  create(): void{
    this.usuarioService.create(this.usuario)
    .subscribe(usuario => {
      this.reouter.navigate(['/usuarios'])
      Swal.fire('Nuevo Usuario',`Usuario ${usuario.nombre} creado con exito!`,'success')
    }); 
  }

  update():void{
    this.usuarioService.update(this.usuario)
    .subscribe( usuario => {
      this.reouter.navigate(['/usuarios'])
      Swal.fire('Usuario Actualizado', `Usuario ${usuario.nombre} actualizado con exito!`, 'success')
    });
  }

  getCargos(){
    this.cargoService.getCargos().subscribe(
      cargos => this.cargos = cargos
    );
  }
}
