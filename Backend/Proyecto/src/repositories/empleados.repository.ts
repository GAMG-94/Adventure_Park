import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Empleados, EmpleadosRelations, Atracciones, Roles, Restaurantes, Rol} from '../models';
import {AtraccionesRepository} from './atracciones.repository';
import {RolesRepository} from './roles.repository';
import {RestaurantesRepository} from './restaurantes.repository';
import {RolRepository} from './rol.repository';

export class EmpleadosRepository extends DefaultCrudRepository<
  Empleados,
  typeof Empleados.prototype.id,
  EmpleadosRelations
> {
  [x: string]: any;

  public readonly atracciones: BelongsToAccessor<Atracciones, typeof Empleados.prototype.id>;

  public readonly roles: HasManyRepositoryFactory<Roles, typeof Empleados.prototype.id>;

  public readonly restaurantes: BelongsToAccessor<Restaurantes, typeof Empleados.prototype.id>;

  public readonly rols: HasManyRepositoryFactory<Rol, typeof Empleados.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('AtraccionesRepository') protected atraccionesRepositoryGetter: Getter<AtraccionesRepository>, @repository.getter('RolesRepository') protected rolesRepositoryGetter: Getter<RolesRepository>, @repository.getter('RestaurantesRepository') protected restaurantesRepositoryGetter: Getter<RestaurantesRepository>, @repository.getter('RolRepository') protected rolRepositoryGetter: Getter<RolRepository>,
  ) {
    super(Empleados, dataSource);
    this.rols = this.createHasManyRepositoryFactoryFor('rols', rolRepositoryGetter,);
    this.registerInclusionResolver('rols', this.rols.inclusionResolver);
    this.restaurantes = this.createBelongsToAccessorFor('restaurantes', restaurantesRepositoryGetter,);
    this.registerInclusionResolver('restaurantes', this.restaurantes.inclusionResolver);
    this.roles = this.createHasManyRepositoryFactoryFor('roles', rolesRepositoryGetter,);
    this.registerInclusionResolver('roles', this.roles.inclusionResolver);
    this.atracciones = this.createBelongsToAccessorFor('atracciones', atraccionesRepositoryGetter,);
    this.registerInclusionResolver('atracciones', this.atracciones.inclusionResolver);
  }
}
