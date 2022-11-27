import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Empleados,
  Rol,
} from '../models';
import {EmpleadosRepository} from '../repositories';

export class EmpleadosRolController {
  constructor(
    @repository(EmpleadosRepository) protected empleadosRepository: EmpleadosRepository,
  ) { }

  @get('/empleados/{id}/rols', {
    responses: {
      '200': {
        description: 'Array of Empleados has many Rol',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Rol)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Rol>,
  ): Promise<Rol[]> {
    return this.empleadosRepository.rols(id).find(filter);
  }

  @post('/empleados/{id}/rols', {
    responses: {
      '200': {
        description: 'Empleados model instance',
        content: {'application/json': {schema: getModelSchemaRef(Rol)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Empleados.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Rol, {
            title: 'NewRolInEmpleados',
            exclude: ['id'],
            optional: ['empleadosId']
          }),
        },
      },
    }) rol: Omit<Rol, 'id'>,
  ): Promise<Rol> {
    return this.empleadosRepository.rols(id).create(rol);
  }

  @patch('/empleados/{id}/rols', {
    responses: {
      '200': {
        description: 'Empleados.Rol PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Rol, {partial: true}),
        },
      },
    })
    rol: Partial<Rol>,
    @param.query.object('where', getWhereSchemaFor(Rol)) where?: Where<Rol>,
  ): Promise<Count> {
    return this.empleadosRepository.rols(id).patch(rol, where);
  }

  @del('/empleados/{id}/rols', {
    responses: {
      '200': {
        description: 'Empleados.Rol DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Rol)) where?: Where<Rol>,
  ): Promise<Count> {
    return this.empleadosRepository.rols(id).delete(where);
  }
}
