import { Model, ModelObject } from "objection";
import { UsersModel } from "./users";
import { CarsModel } from "./cars";

export class OrdersModel extends Model {
  id!: string;
  user_id!: number;
  car_id!: number;
  start_rent!: Date;
  end_rent!: Date;
  total_price!: number;
  status!: string;
  created_at!: Date;
  updated_at!: Date;

  static get tableName() {
    return 'orders';
  }

  static get relationMappings() {
    return {
      users: {
        relation: Model.BelongsToOneRelation,
        modelClass: UsersModel,
        join: {
          from: 'orders.user_id',
          to: 'users.id'
        }
      },
      cars: {
        relation: Model.BelongsToOneRelation,
        modelClass: CarsModel,
        join: {
          from: 'orders.car_id',
          to: 'cars.id'
        }
      }
    }
  }
}

export type Orders = ModelObject<OrdersModel>;
