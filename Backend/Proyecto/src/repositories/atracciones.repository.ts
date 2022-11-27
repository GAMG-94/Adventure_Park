import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Atracciones, AtraccionesRelations} from '../models';

export class AtraccionesRepository extends DefaultCrudRepository<
  Atracciones,
  typeof Atracciones.prototype.id,
  AtraccionesRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(Atracciones, dataSource);
  }
}
