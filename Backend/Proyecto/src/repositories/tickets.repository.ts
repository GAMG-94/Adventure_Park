import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Tickets, TicketsRelations} from '../models';

export class TicketsRepository extends DefaultCrudRepository<
  Tickets,
  typeof Tickets.prototype.id,
  TicketsRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(Tickets, dataSource);
  }
}
