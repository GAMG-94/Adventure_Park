import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Restaurantes, RestaurantesRelations} from '../models';

export class RestaurantesRepository extends DefaultCrudRepository<
  Restaurantes,
  typeof Restaurantes.prototype.id,
  RestaurantesRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(Restaurantes, dataSource);
  }
}
