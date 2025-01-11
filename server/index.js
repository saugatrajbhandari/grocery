import Fastify from "fastify";
import "dotenv/config";
import { connectDB } from "./src/config/connect.js";
import cors from "@fastify/cors";
import { registerRoutes } from "./src/routes/auth.js";

// Create Fastify instance
const fastify = Fastify({ logger: true });

await registerRoutes(fastify);

// Register plugins
fastify.register(cors, {
  origin: "*", // Adjust this to restrict allowed origins
});

// Define routes
fastify.get("/", async (request, reply) => {
  return { message: "Hello, Fastify!" };
});

// Start the server
const start = async () => {
  try {
    console.log(`Server is running at http://localhost:8000`);
    await connectDB(process.env.MONGODB_URI); // Connect to DB
    await fastify.listen({ port: 8000 }); // Start the server after everything is ready
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
