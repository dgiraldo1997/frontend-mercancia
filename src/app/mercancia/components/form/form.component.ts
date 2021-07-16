import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/usuarios/components/container/usuario.model';
import { UsuarioService } from 'src/app/usuarios/components/container/usuario.service';
import Swal from 'sweetalert2';
import { Mercancia } from '../container/mercancia.model';
import { MercanciaService } from '../container/mercancia.service';
 
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  public mercancia:Mercancia = new Mercancia();
  public titulo:string="Modulo de Mercancia";
  usuarios: Usuario[]=[];

  constructor(private mercanciaService: MercanciaService,private reouter:Router,private activateRout:ActivatedRoute,
     private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.getUsuarios();
    this.cargarMercancia();
  } 

  cargarMercancia(): void{
    this.activateRout.params.subscribe(params => {
      let id = params['id']
      if(id){
        this.mercanciaService.getMercancias(id).subscribe(
          (mercancia)=>{
            this.mercancia=mercancia;
            this.mercancia.idusuarioCrea=mercancia.usuariocrea.id;
            this.mercancia.idusuarioEdita=mercancia.usuarioedita.id;
          }
        );
      };
    });
  }

  create(): void{
    this.mercanciaService.create(this.mercancia)
    .subscribe(mercancia => {
      this.reouter.navigate(['/mercancias'])
      Swal.fire('Nueva Mercancia',`Mercancia ${mercancia.nombre} creada con exito!`,'success')
    }); 
  }

  update():void{
    this.mercanciaService.update(this.mercancia)
    .subscribe( mercancia => {
      this.reouter.navigate(['/mercancias'])
      Swal.fire('Mercancia Actualizada', `Mercancia ${mercancia.nombre} actualizada con exito!`, 'success')
    });
  }

  getUsuarios(){
    this.usuarioService.getUsuario().subscribe(
      usuarios => this.usuarios = usuarios
    );
  }
}
