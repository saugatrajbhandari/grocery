// server.js
const fastify = require("fastify")({ logger: true });
require("dotenv/config");
const { connectDB } = require("./src/config/connect");
// Register plugins
fastify.register(require("@fastify/cors"), {
  origin: "*", // Adjust this to restrict allowed origins
});

// Define routes
fastify.get("/", async (request, reply) => {
  return { message: "Hello, Fastify!" };
});

// Start the server
const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URI);
    await fastify.listen({ port: 8000 });
    console.log(`Server is running at http://localhost:8000`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
