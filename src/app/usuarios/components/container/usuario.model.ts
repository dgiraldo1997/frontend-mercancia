import { Cargo } from "../../../cargos/components/container/cargo.model";

export class Usuario {
    id!: number;
    nombre!: string;
    apellido!: string;
    edad!: number;
    activo!: boolean;
    createdAt!: Date;
    updatedAt!: Date;
    cargo!: Cargo;
    idcargo!: number;
}
