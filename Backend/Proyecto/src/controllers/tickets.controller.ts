import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Tickets} from '../models';
import {TicketsRepository} from '../repositories';

export class TicketsController {
  constructor(
    @repository(TicketsRepository)
    public ticketsRepository : TicketsRepository,
  ) {}

  @post('/tickets')
  @response(200, {
    description: 'Tickets model instance',
    content: {'application/json': {schema: getModelSchemaRef(Tickets)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tickets, {
            title: 'NewTickets',
            exclude: ['id'],
          }),
        },
      },
    })
    tickets: Omit<Tickets, 'id'>,
  ): Promise<Tickets> {
    return this.ticketsRepository.create(tickets);
  }

  @get('/tickets/count')
  @response(200, {
    description: 'Tickets model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Tickets) where?: Where<Tickets>,
  ): Promise<Count> {
    return this.ticketsRepository.count(where);
  }

  @get('/tickets')
  @response(200, {
    description: 'Array of Tickets model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Tickets, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Tickets) filter?: Filter<Tickets>,
  ): Promise<Tickets[]> {
    return this.ticketsRepository.find(filter);
  }

  @patch('/tickets')
  @response(200, {
    description: 'Tickets PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tickets, {partial: true}),
        },
      },
    })
    tickets: Tickets,
    @param.where(Tickets) where?: Where<Tickets>,
  ): Promise<Count> {
    return this.ticketsRepository.updateAll(tickets, where);
  }

  @get('/tickets/{id}')
  @response(200, {
    description: 'Tickets model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Tickets, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Tickets, {exclude: 'where'}) filter?: FilterExcludingWhere<Tickets>
  ): Promise<Tickets> {
    return this.ticketsRepository.findById(id, filter);
  }

  @patch('/tickets/{id}')
  @response(204, {
    description: 'Tickets PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tickets, {partial: true}),
        },
      },
    })
    tickets: Tickets,
  ): Promise<void> {
    await this.ticketsRepository.updateById(id, tickets);
  }

  @put('/tickets/{id}')
  @response(204, {
    description: 'Tickets PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() tickets: Tickets,
  ): Promise<void> {
    await this.ticketsRepository.replaceById(id, tickets);
  }

  @del('/tickets/{id}')
  @response(204, {
    description: 'Tickets DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.ticketsRepository.deleteById(id);
  }
}
