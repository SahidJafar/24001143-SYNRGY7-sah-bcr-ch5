import { Model, ModelObject } from "objection";
import { OrdersModel } from "./orders";

export class UsersModel extends Model {
  id!: number;
  user_type!:string;
  name!: string;
  email!: string;
  phone_number!: string;
  password!: string;
  created_at!: Date;
  updated_at!: Date;

  static get tableName() {
    return "users";
  }
  static get relationMappings(){
    return{
        orders:{
            relation:Model.HasManyRelation,
            modelClass: OrdersModel,
            join:{
                from: 'users.id',
                to: 'orders.user_id'
            }
        }
    }
  }
}

export type Users = ModelObject<UsersModel>;