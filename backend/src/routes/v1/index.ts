import express from "express";
import jwtAuth from "../../middlewares/jwt-auth.routes";
import userRoutes from "./users.route";
import uptimeRoutes from "./uptime.route";
import authRoutes from "./auth.route";
import pocketsRoutes from "./pockets.route";
import categoriesRoutes from "./categories.route";
import transactionsRoutes from "./transactions.route";

const router = express.Router();

router.use("/uptime", uptimeRoutes); // <-- public routes
router.use("/auth", authRoutes);
router.use("/users", jwtAuth, userRoutes); // <-- private routes
router.use("/pockets", jwtAuth, pocketsRoutes); // <-- private routes
router.use("/categories", jwtAuth, categoriesRoutes); // <-- private routes
router.use("/transactions", jwtAuth, transactionsRoutes); // <-- private routes

export default router;
