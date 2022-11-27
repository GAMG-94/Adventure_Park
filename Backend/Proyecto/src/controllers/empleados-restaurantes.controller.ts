import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Empleados,
  Restaurantes,
} from '../models';
import {EmpleadosRepository} from '../repositories';

export class EmpleadosRestaurantesController {
  constructor(
    @repository(EmpleadosRepository)
    public empleadosRepository: EmpleadosRepository,
  ) { }

  @get('/empleados/{id}/restaurantes', {
    responses: {
      '200': {
        description: 'Restaurantes belonging to Empleados',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Restaurantes)},
          },
        },
      },
    },
  })
  async getRestaurantes(
    @param.path.string('id') id: typeof Empleados.prototype.id,
  ): Promise<Restaurantes> {
    return this.empleadosRepository.restaurantes(id);
  }
}
