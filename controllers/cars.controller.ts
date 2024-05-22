import { Request, Response } from "express";
import { ResponseHelper } from "../helpers/response.helper";
import { CarsModel } from "../databases/models/cars";
import { deleteImageFromCloudinary, uploadImageToCloudinary } from "../utils/file.manipulate";

export class CarsController extends ResponseHelper{
    carList = async (req:Request, res:Response) => {
        try {
            const cars = await CarsModel.query()
            return this.success("Cars Data Found", cars, 200)(res);
        } catch (error: Error | any ) {
            return this.error(error.message, null, 404)(res)
        }
    }
    getCarById = async (req:Request, res:Response) => {
        try {
            const id:string = req.params.id;
            const cars = await CarsModel.query().findById(id)
            if (!cars) return this.error("Cars Data Not Found", null, 404)(res)
            else return this.success("Cars Data Found", cars, 200)(res);
        } catch (error: Error | any ) {
            return this.error(error.message, null, 404)(res)
        }
    }
    create = async (req: Request, res: Response) => {
      try {
          if (!req.file) {
              return this.error("File is required", null, 400)(res);
          }

          const image = await uploadImageToCloudinary(req.file, "cars");
          const cars = await CarsModel.query().insert({
              ...req.body,
              image: image.secure_url,
              image_public_id: image.public_id,
          });

          return this.success("Data inserted successfully", cars, 200)(res);
      } catch (error: Error | any) {
          return this.error(error.message, null, 500)(res);
      }
  }
    update = async (req: Request, res: Response) => {
        try {
          const id: string = req.params.id;
          const carByid = await CarsModel.query().findById(id);
          if (carByid?.image) {
            deleteImageFromCloudinary(carByid.image_public_id);
          }
          const image = await uploadImageToCloudinary(req.file, "cars");
    
          const cars = await CarsModel.query().patchAndFetchById(id, {
            ...req.body,
            image: image.secure_url,
            image_public_id: image.public_id
          });
          if (!cars) return this.error("Data not found", null, 404)(res)
          else return this.success(
            `Data with id ${id} updated successfully`,
            cars,
            200
          )(res);
        } catch (error: Error | any) {
          return this.error(error.message, null, 404)(res);
        }
      }
    deleteCarByID = async (req: Request, res: Response) => {
        try {
          const id: string = req.params.id;
          const data = await CarsModel.query().findById(id);
          if (data?.image) {
            deleteImageFromCloudinary(data.image_public_id);
          }
          const cars = await CarsModel.query().deleteById(id);
          if (!cars) return this.error("Data not found", null, 404)(res)
          else return this.success(
            `Data with id ${id} deleted successfully`,
            null,
            200
          )(res);
        } catch (error: Error | any) {
          return this.error(error.message, null, 404)(res);
        }
      };
} 
