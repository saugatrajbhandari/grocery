import Fastify from "fastify";
import "dotenv/config";
import { connectDB } from "./src/config/connect.js";
import { buildAdminRouter } from "./src/config/setup.js";
import cors from "@fastify/cors";
import { store } from "./src/config/config.js";
import fastifySession from "@fastify/session"; // Import fastify-session
import fastifyCookie from "@fastify/cookie"; // Import fastify-cookie

// Create Fastify instance
const fastify = Fastify({ logger: true });

// Register plugins
fastify.register(cors, {
  origin: "*", // Adjust this to restrict allowed origins
});

// Register fastify-cookie before fastify-session
fastify.register(fastifyCookie);

// Register session with MongoDB store
fastify.register(fastifySession, {
  secret: process.env.ADMIN_SESSION_SECRET || "your32+characterlongsecret", // Ensure secret is 32+ characters
  cookie: { secure: false }, // Set `true` if using HTTPS
  store, // Use the session store we created earlier
  saveUninitialized: true,
  rolling: true, // Optional, keeps the session active
});

// Define routes
fastify.get("/", async (request, reply) => {
  return { message: "Hello, Fastify!" };
});

// Start the server
const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URI); // Connect to DB
    await buildAdminRouter(fastify); // Ensure AdminJS router is built before starting the server
    await fastify.listen({ port: 8000 }); // Start the server after everything is ready
    console.log(`Server is running at http://localhost:8000`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
