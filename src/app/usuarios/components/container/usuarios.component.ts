import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Usuario } from './usuario.model';
import { UsuarioService } from './usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html'
})
export class UsuariosComponent implements OnInit {

  //declaramos la variable usuarios como array del model Usuario
  usuarios: Usuario[]=[];
  //inyectamos el UsuarioService en la variable usuarioService
  constructor(private usuarioService:UsuarioService) { }

  ngOnInit(): void {
    //capturamos los datos del getUsuarios creando el observador
    this.usuarioService.getUsuario().subscribe(
      usuarios => this.usuarios = usuarios
    );
  }

  delete(usuario: Usuario):void{
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Esta seguro?',
      text: `¿Seguro que desea eliminar el usuario ${usuario.nombre} ${usuario.apellido}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.delete(usuario.id).subscribe(
          response =>{
            this.usuarios = this.usuarios.filter(usu => usu !== usuario);
            swalWithBootstrapButtons.fire(
              'Usuario Eliminado!',
              `Usuario ${usuario.nombre} eliminado con exito.`,
              'success'
            );
          });
        
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'El usuario esta a salvo :)',
          'error'
        )
      }
    })
  }

}
