import {Entity, model, property} from '@loopback/repository';

@model()
export class Restaurantes extends Entity {
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
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  codigo: string;

  @property({
    type: 'string',
    required: true,
  })
  imagen: string;


  constructor(data?: Partial<Restaurantes>) {
    super(data);
  }
}

export interface RestaurantesRelations {
  // describe navigational properties here
}

export type RestaurantesWithRelations = Restaurantes & RestaurantesRelations;
