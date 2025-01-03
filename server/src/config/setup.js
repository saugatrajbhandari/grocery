const AdminJS = require("adminjs");
const AdminJSFastify = require("@adminjs/fastify");
const AdminJSMongoose = require("@adminjs/mongoose");
const { Admin, Customer, DeliveryPartner } = require("../models/user");
const Branch = require("../models/branch");
const { store } = require("./config");

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

const buildAdminRouter = async (app) => {
  await AdminJSFastify.buildAuthenticatedRouter(
    admin,
    { authenticate, cookiePassword: "saugat", cookieName: "saugat" },
    app,
    {
      store: store,
      saveUninitialized: true,
      secret: "saugat",
    }
  );
};

module.exports = { admin, buildAdminRouter };
