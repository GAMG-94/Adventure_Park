import { service } from '@loopback/core';
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
import {Clientes, Credenciales} from '../models';
import {ClientesRepository} from '../repositories';
import { AutenticacionService } from '../services';
const fetch = require('node-fetch');

export class ClientesController {
  constructor(
    @repository(ClientesRepository)
    public clientesRepository : ClientesRepository,
    @service(AutenticacionService)
    public servicioAutenticacion: AutenticacionService
  ) {}

  @post('/Registro')
  @response(200, {
    description: 'Clientes model instance',
    content: {'application/json': {schema: getModelSchemaRef(Clientes)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Clientes, {
            title: 'NewClientes',
            exclude: ['id'],
          }),
        },
      },
    })
    clientes: Omit<Clientes, 'id'>,
  ): Promise<Clientes> {

    let clave = this.servicioAutenticacion.GenerarPassword();
    let claveCifrada = this.servicioAutenticacion.EncriptarPassword(clave);
    clientes.clave = claveCifrada;

    let c = await this.clientesRepository.create(clientes);

    // NOTIFICACIÓN AL USUARIO

    let destino = c.correo;
    let asunto = "Registró En Adventure Park";
    let mensaje = `Hola, ${c.nombre}, Su Usuario De Acceso Es: ${c.correo} y Su Contraseña Es: ${clave}`;

    fetch(`http://localhost:5000/envio-correo?correo_destino=${destino}&asunto=${asunto}&contenido=${mensaje}`).then((data:any)=>{
      console.log(data);
    });

    return c;
  }

  @get('/clientes/count')
  @response(200, {
    description: 'Clientes model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Clientes) where?: Where<Clientes>,
  ): Promise<Count> {
    return this.clientesRepository.count(where);
  }

  @get('/clientes')
  @response(200, {
    description: 'Array of Clientes model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Clientes, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Clientes) filter?: Filter<Clientes>,
  ): Promise<Clientes[]> {
    return this.clientesRepository.find(filter);
  }

  @patch('/clientes')
  @response(200, {
    description: 'Clientes PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Clientes, {partial: true}),
        },
      },
    })
    clientes: Clientes,
    @param.where(Clientes) where?: Where<Clientes>,
  ): Promise<Count> {
    return this.clientesRepository.updateAll(clientes, where);
  }

  @get('/clientes/{id}')
  @response(200, {
    description: 'Clientes model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Clientes, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Clientes, {exclude: 'where'}) filter?: FilterExcludingWhere<Clientes>
  ): Promise<Clientes> {
    return this.clientesRepository.findById(id, filter);
  }

  @patch('/clientes/{id}')
  @response(204, {
    description: 'Clientes PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Clientes, {partial: true}),
        },
      },
    })
    clientes: Clientes,
  ): Promise<void> {
    await this.clientesRepository.updateById(id, clientes);
  }

  @put('/clientes/{id}')
  @response(204, {
    description: 'Clientes PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() clientes: Clientes,
  ): Promise<void> {
    await this.clientesRepository.replaceById(id, clientes);
  }

  @del('/clientes/{id}')
  @response(204, {
    description: 'Clientes DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.clientesRepository.deleteById(id);
  }

  /* METODOS PROPIOS - LÓGICA DE NEGOCIO */

  @post('/Login')
  @response(200, {
    description:'Identificacion de cliente'
  })
  async identificar(
    @requestBody() credenciales:Credenciales
  ):Promise<Clientes | null>{
    credenciales.password = this.servicioAutenticacion.EncriptarPassword(credenciales.password);
    let clienteEncontrado = await this.clientesRepository.findOne({
      where: {
        correo: credenciales.usuario,
        clave: credenciales.password
      }
    });
    return clienteEncontrado;
  }

}
