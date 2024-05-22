import { Router, Request, Response} from 'express';
import { CarsController } from '../controllers/cars.controller';
import upload from '../utils/upload.on.memory';
import { UsersController } from '../controllers/users.controller';  
import { auth, is_admin } from '../utils/auth';
import { OrdersController } from '../controllers/orders.controller';

export const router = Router();

// Cars
router.get("/cars", new CarsController().carList);
router.get("/cars/:id", new CarsController().getCarById);
router.post("/cars", auth, is_admin, upload.single("image"), new CarsController().create);
router.put("/cars/:id", auth, is_admin, upload.single("image"), new CarsController().update);
router.delete("/cars/:id", auth, is_admin, new CarsController().deleteCarByID);

// Users
router.post("/users/register", new UsersController().register);
router.post("/users/login", new UsersController().login);

// Orders
router.get("/orders", auth, is_admin, new OrdersController().orderList);
router.get("/orders/:id", auth, new OrdersController().getOrderById);
router.post("/orders", auth, new OrdersController().create);
router.put("/orders/:id", auth, is_admin, new OrdersController().updateStatus);

export default router