import AdminJS from "adminjs";
import AdminJSFastify from "@adminjs/fastify";
import * as AdminJSMongoose from "@adminjs/mongoose";
import { Admin, Customer, DeliveryPartner } from "../models/user.js";
import { Branch } from "../models/branch.js";
import { store } from "./config.js";
import { authenticate } from "./config.js";

// Register AdminJS Mongoose adapter
AdminJS.registerAdapter(AdminJSMongoose);

const admin = new AdminJS({
  resources: [
    {
      resource: Customer,
      options: {
        listProperties: ["phoneNumber", "role", "isActivated"],
        filterProperties: ["phoneNumber", "role", "isActivated"],
      },
    },
    {
      resource: DeliveryPartner,
      options: {
        listProperties: ["email", "role", "isActivated"],
        filterProperties: ["email", "role", "isActivated"],
      },
    },
    {
      resource: Admin,
      options: {
        listProperties: ["email", "role", "isActivated"],
        filterProperties: ["email", "role", "isActivated"],
      },
    },
    {
      resource: Branch,
    },
  ],
  rootPath: "/admin",
});

// Build AdminJS authenticated router for Fastify
const buildAdminRouter = async (app) => {
  await AdminJSFastify.buildAuthenticatedRouter(
    admin,
    {
      authenticate, // Ensure your authenticate function is correctly implemented
      cookiePassword:
        process.env.ADMIN_COOKIE_PASSWORD || "your_secure_cookie_password", // Use environment variable for cookie password
      cookieName: process.env.ADMIN_COOKIE_NAME || "admin_session", // Use environment variable for cookie name
    },
    app,
    {
      store: store,
      saveUninitialized: true,
      secret: process.env.ADMIN_SESSION_SECRET || "your_secure_session_secret", // Use environment variable for session secret
    }
  );
};

export { admin, buildAdminRouter };
