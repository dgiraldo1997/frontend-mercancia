import { Usuario } from "src/app/usuarios/components/container/usuario.model";

export class Mercancia {
    id!: number;
    nombre!: string;
    cantidad!: number;
    activo!: boolean;
    idusuarioCrea!: number;
    idusuarioEdita!: number;
    createdAt!: Date;
    updatedAt!: Date;
    usuariocrea!: Usuario;
    usuarioedita!: Usuario;
}
