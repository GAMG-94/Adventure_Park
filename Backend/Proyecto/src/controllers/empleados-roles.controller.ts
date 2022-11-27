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
  Roles,
} from '../models';
import {EmpleadosRepository} from '../repositories';

export class EmpleadosRolesController {
  constructor(
    @repository(EmpleadosRepository) protected empleadosRepository: EmpleadosRepository,
  ) { }

  @get('/empleados/{id}/roles', {
    responses: {
      '200': {
        description: 'Array of Empleados has many Roles',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Roles)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Roles>,
  ): Promise<Roles[]> {
    return this.empleadosRepository.roles(id).find(filter);
  }

  @post('/empleados/{id}/roles', {
    responses: {
      '200': {
        description: 'Empleados model instance',
        content: {'application/json': {schema: getModelSchemaRef(Roles)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Empleados.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Roles, {
            title: 'NewRolesInEmpleados',
            exclude: ['id'],
            optional: ['empleadosId']
          }),
        },
      },
    }) roles: Omit<Roles, 'id'>,
  ): Promise<Roles> {
    return this.empleadosRepository.roles(id).create(roles);
  }

  @patch('/empleados/{id}/roles', {
    responses: {
      '200': {
        description: 'Empleados.Roles PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Roles, {partial: true}),
        },
      },
    })
    roles: Partial<Roles>,
    @param.query.object('where', getWhereSchemaFor(Roles)) where?: Where<Roles>,
  ): Promise<Count> {
    return this.empleadosRepository.roles(id).patch(roles, where);
  }

  @del('/empleados/{id}/roles', {
    responses: {
      '200': {
        description: 'Empleados.Roles DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Roles)) where?: Where<Roles>,
  ): Promise<Count> {
    return this.empleadosRepository.roles(id).delete(where);
  }
}
