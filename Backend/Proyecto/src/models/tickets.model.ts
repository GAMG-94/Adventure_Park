import {Entity, model, property} from '@loopback/repository';

@model()
export class Tickets extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    generated: true,
  })
  nombre?: string;

  @property({
    type: 'number',
    required: true,
  })
  cantidad: number;

  @property({
    type: 'number',
    required: true,
  })
  precio: number;

  @property({
    type: 'number',
    required: true,
  })
  total: number;

  @property({
    type: 'string',
    required: true,
  })
  id_cliente: string;

  @property({
    type: 'string',
  })
  clientesId?: string;

  constructor(data?: Partial<Tickets>) {
    super(data);
  }
}

export interface TicketsRelations {
  // describe navigational properties here
}

export type TicketsWithRelations = Tickets & TicketsRelations;
