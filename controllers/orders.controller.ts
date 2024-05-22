import { Response, Request } from "express";

import { OrdersModel } from "../databases/models/orders";
import { CarsModel } from "../databases/models/cars";
import { ResponseHelper } from "../helpers/response.helper";

export class OrdersController extends ResponseHelper {
  create = async (req: Request, res: Response) => {
    try {
      const cars = await CarsModel.query().findById(req.body.car_id);

      if (cars === undefined) {
        return this.error("Cars not found", null, 404)(res);
      }

      let endRent = new Date(req.body.end_rent);
      let startRent = new Date(req.body.start_rent);

      let timeDifference = endRent.getTime() - startRent.getTime();

      let dayDifference = timeDifference / (1000 * 60 * 60 * 24);

      const orders = await OrdersModel.query().insert({
        user_id: req.body.user_id,
        car_id: req.body.car_id,
        start_rent: req.body.start_rent,
        end_rent: req.body.end_rent,
        total_price: dayDifference * cars?.rent_per_day,
        status: req.body.status
      });

      return this.success("Data inserted successfully", orders, 200)(res);
    } catch (err: Error | any) {
      return this.error(err.message, null, 400)(res);
    }
  };

  updateStatus = async (req: Request, res: Response) => {
    try {
      const id:string = req.params.id;
      const update = await OrdersModel.query().patchAndFetchById(
        id,
        {
          status: req.body.status,
        }
      );
      return this.success(
        `Data with id ${id} status updated successfully`,
        update,
        200
      )(res);
    } catch (err: Error | any) {
      return this.error(err.message, null, 400)(res);
    }
  };

  orderList = async (req: Request, res: Response) => {
    try {
      const orders = await OrdersModel.query().withGraphFetched("[cars,users]");
      return this.success("Orders Data Found", orders, 200)(res);
    } catch (error: Error | any) {
      return this.error(error.message, null, 404)(res);
    }
  };

  getOrderById = async (req: Request, res: Response) => {
    try {
      const id:string = req.params.id;
      const orders = await OrdersModel.query()
      .findById(id)
      .withGraphFetched("[users, cars]"); 
      if (!orders) return this.error("Cars Data Not Found", null, 404)(res)
      else return this.success("Orders Data Found", orders, 200)(res);
    } catch (error: Error | any) {
      return this.error(error.message, null, 404)(res);
    }
  };
}