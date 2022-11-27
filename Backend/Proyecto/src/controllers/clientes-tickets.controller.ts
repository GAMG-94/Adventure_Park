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
  Clientes,
  Tickets,
} from '../models';
import {ClientesRepository} from '../repositories';

export class ClientesTicketsController {
  constructor(
    @repository(ClientesRepository) protected clientesRepository: ClientesRepository,
  ) { }

  @get('/clientes/{id}/tickets', {
    responses: {
      '200': {
        description: 'Array of Clientes has many Tickets',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Tickets)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Tickets>,
  ): Promise<Tickets[]> {
    return this.clientesRepository.tickets(id).find(filter);
  }

  @post('/clientes/{id}/tickets', {
    responses: {
      '200': {
        description: 'Clientes model instance',
        content: {'application/json': {schema: getModelSchemaRef(Tickets)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Clientes.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tickets, {
            title: 'NewTicketsInClientes',
            exclude: ['id'],
            optional: ['clientesId']
          }),
        },
      },
    }) tickets: Omit<Tickets, 'id'>,
  ): Promise<Tickets> {
    return this.clientesRepository.tickets(id).create(tickets);
  }

  @patch('/clientes/{id}/tickets', {
    responses: {
      '200': {
        description: 'Clientes.Tickets PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tickets, {partial: true}),
        },
      },
    })
    tickets: Partial<Tickets>,
    @param.query.object('where', getWhereSchemaFor(Tickets)) where?: Where<Tickets>,
  ): Promise<Count> {
    return this.clientesRepository.tickets(id).patch(tickets, where);
  }

  @del('/clientes/{id}/tickets', {
    responses: {
      '200': {
        description: 'Clientes.Tickets DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Tickets)) where?: Where<Tickets>,
  ): Promise<Count> {
    return this.clientesRepository.tickets(id).delete(where);
  }
}
