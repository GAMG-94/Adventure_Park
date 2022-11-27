import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Clientes, ClientesRelations, Tickets} from '../models';
import {TicketsRepository} from './tickets.repository';

export class ClientesRepository extends DefaultCrudRepository<
  Clientes,
  typeof Clientes.prototype.id,
  ClientesRelations
> {

  public readonly tickets: HasManyRepositoryFactory<Tickets, typeof Clientes.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('TicketsRepository') protected ticketsRepositoryGetter: Getter<TicketsRepository>,
  ) {
    super(Clientes, dataSource);
    this.tickets = this.createHasManyRepositoryFactoryFor('tickets', ticketsRepositoryGetter,);
    this.registerInclusionResolver('tickets', this.tickets.inclusionResolver);
  }
}
