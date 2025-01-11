import {
  fetchUser,
  loginCustomer,
  loginDeliveryPartner,
} from "../controller/auth/auth.js";
import { verifyToken } from "../middleware/auth.js";

export const authRoutes = async (fastify, options) => {
  fastify.post("/customer/login", loginCustomer);
  fastify.post("/delivery/login", loginDeliveryPartner);
  fastify.get("/user", { preHandler: [verifyToken] }, fetchUser);
};

export const registerRoutes = async (fastify) => {
  fastify.register(authRoutes, { prefix: "/api" });
};
