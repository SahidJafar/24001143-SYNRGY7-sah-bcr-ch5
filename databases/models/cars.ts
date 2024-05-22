import { Model, ModelObject } from "objection";
import { OrdersModel } from "./orders";

export class CarsModel extends Model {
    id!: number
    plate!: string
    manufacture!: string
    model!: string
    image!: string
    image_public_id!: string
    rent_per_day!: number
    capacity!: number
    description!: string
    available_at!: Date
    transmission!: string
    available!: boolean
    type!: string
    year!: number
    created_at!: Date
    updated_at!: Date

    static get tableName() {
      return 'cars';
    }
    static get relationMappings(){
      return{
          orders:{
              relation:Model.HasManyRelation,
              modelClass: OrdersModel,
              join:{
                  from: 'cars.id',
                  to: 'orders.car_id'
              }
          }
      }
    }
  }
  
  export type Cars = ModelObject<CarsModel>;