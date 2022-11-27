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
  Atracciones,
} from '../models';
import {EmpleadosRepository} from '../repositories';

export class EmpleadosAtraccionesController {
  constructor(
    @repository(EmpleadosRepository)
    public empleadosRepository: EmpleadosRepository,
  ) { }

  @get('/empleados/{id}/atracciones', {
    responses: {
      '200': {
        description: 'Atracciones belonging to Empleados',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Atracciones)},
          },
        },
      },
    },
  })
  async getAtracciones(
    @param.path.string('id') id: typeof Empleados.prototype.id,
  ): Promise<Atracciones> {
    return this.empleadosRepository.atracciones(id);
  }
}
