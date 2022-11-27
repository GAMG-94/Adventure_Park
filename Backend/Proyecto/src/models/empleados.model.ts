import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Atracciones} from './atracciones.model';
import {Roles} from './roles.model';
import {Restaurantes} from './restaurantes.model';
import {Rol} from './rol.model';

@model()
export class Empleados extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombres: string;

  @property({
    type: 'string',
    required: true,
  })
  apellidos: string;

  @property({
    type: 'string',
    required: true,
  })
  correo: string;

  @property({
    type: 'string',
    required: true,
  })
  celular: string;

  @property({
    type: 'string',
    required: true,
  })
  rol: string;

  @property({
    type: 'string',
    required: true,
  })
  id_rol: string;

  @belongsTo(() => Atracciones)
  atraccionesId: string;

  @hasMany(() => Roles)
  roles: Roles[];

  @belongsTo(() => Restaurantes)
  restaurantesId: string;

  @hasMany(() => Rol)
  rols: Rol[];

  constructor(data?: Partial<Empleados>) {
    super(data);
  }
}

export interface EmpleadosRelations {
  // describe navigational properties here
}

export type EmpleadosWithRelations = Empleados & EmpleadosRelations;
