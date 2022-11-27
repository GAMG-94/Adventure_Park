import {Entity, model, property} from '@loopback/repository';

@model()
export class Roles extends Entity {
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
  administrador: string;

  @property({
    type: 'string',
    required: true,
  })
  gerente: string;

  @property({
    type: 'string',
    required: true,
  })
  vendedor: string;

  @property({
    type: 'string',
    required: true,
  })
  tecnico: string;

  @property({
    type: 'string',
    required: true,
  })
  seguridad: string;

  @property({
    type: 'string',
  })
  empleadosId?: string;

  constructor(data?: Partial<Roles>) {
    super(data);
  }
}

export interface RolesRelations {
  // describe navigational properties here
}

export type RolesWithRelations = Roles & RolesRelations;
