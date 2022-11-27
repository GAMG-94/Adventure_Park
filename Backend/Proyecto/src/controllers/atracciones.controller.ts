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
import {Atracciones} from '../models';
import {AtraccionesRepository} from '../repositories';

export class AtraccionesController {
  constructor(
    @repository(AtraccionesRepository)
    public atraccionesRepository : AtraccionesRepository,
  ) {}

  @post('/atracciones')
  @response(200, {
    description: 'Atracciones model instance',
    content: {'application/json': {schema: getModelSchemaRef(Atracciones)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Atracciones, {
            title: 'NewAtracciones',
            exclude: ['id'],
          }),
        },
      },
    })
    atracciones: Omit<Atracciones, 'id'>,
  ): Promise<Atracciones> {
    return this.atraccionesRepository.create(atracciones);
  }

  @get('/atracciones/count')
  @response(200, {
    description: 'Atracciones model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Atracciones) where?: Where<Atracciones>,
  ): Promise<Count> {
    return this.atraccionesRepository.count(where);
  }

  @get('/atracciones')
  @response(200, {
    description: 'Array of Atracciones model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Atracciones, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Atracciones) filter?: Filter<Atracciones>,
  ): Promise<Atracciones[]> {
    return this.atraccionesRepository.find(filter);
  }

  @patch('/atracciones')
  @response(200, {
    description: 'Atracciones PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Atracciones, {partial: true}),
        },
      },
    })
    atracciones: Atracciones,
    @param.where(Atracciones) where?: Where<Atracciones>,
  ): Promise<Count> {
    return this.atraccionesRepository.updateAll(atracciones, where);
  }

  @get('/atracciones/{id}')
  @response(200, {
    description: 'Atracciones model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Atracciones, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Atracciones, {exclude: 'where'}) filter?: FilterExcludingWhere<Atracciones>
  ): Promise<Atracciones> {
    return this.atraccionesRepository.findById(id, filter);
  }

  @patch('/atracciones/{id}')
  @response(204, {
    description: 'Atracciones PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Atracciones, {partial: true}),
        },
      },
    })
    atracciones: Atracciones,
  ): Promise<void> {
    await this.atraccionesRepository.updateById(id, atracciones);
  }

  @put('/atracciones/{id}')
  @response(204, {
    description: 'Atracciones PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() atracciones: Atracciones,
  ): Promise<void> {
    await this.atraccionesRepository.replaceById(id, atracciones);
  }

  @del('/atracciones/{id}')
  @response(204, {
    description: 'Atracciones DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.atraccionesRepository.deleteById(id);
  }
}
