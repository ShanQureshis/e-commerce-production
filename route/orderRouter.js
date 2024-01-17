import express from "express";
import { isAdmin, isAuth } from "../data/middleWares.js";
import {
  changeOrderStatusController,
  createOrderController,
  getAllOrdersController,
  getMyOrdersCotroller,
  paymetsController,
  singleOrderDetrailsController,
} from "../controller/orderController.js";

const router = express.Router();

//routes
// ============== ORDERS ROUTES ==================

// CREATE ORDERS
router.post("/create", isAuth, createOrderController);

//  GET ALL ORDERS
router.get("/my-orders", isAuth, getMyOrdersCotroller);

//  GET SINGLE ORDER DETAILS
router.get("/my-orders/:id", isAuth, singleOrderDetrailsController);

// receipt payments
router.post("/payments", isAuth, paymetsController);

/// ======== ADMIN PART ============
// get all order
router.get("/admin/get-all-orders", isAuth,isAdmin, getAllOrdersController);

// change order status
router.put("/admin/:id", isAuth,isAdmin, changeOrderStatusController);

// ====================================================================

export default router;
