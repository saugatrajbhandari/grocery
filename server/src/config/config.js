require("dotenv/config");
const fastifySession = require("@fastify/session");
const MongoDBStore = require("connect-mongodb-session")(fastifySession);

const store = new MongoDBStore({
  uri: process.env.MONGODB_URI,
  collection: "mySessions",
});

store.on("error", function (error) {
  console.log(error);
});

const authenticate = async (email, password) => {
  if (email === "saugat@gmail.com" && password === "123456") {
    return Promise.resolve({ email, password });
  } else {
    return null;
  }
};

module.exports = { store, authenticate };
