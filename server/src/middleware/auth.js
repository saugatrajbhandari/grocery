import jwt from "jsonwebtoken";

export const verifyToken = (req, reply) => {
  try {
    const authHeader = req.headers["authorization"];

    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return reply.status(401).send({ message: "Access Token required" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    req.user = decoded;

    return true;
  } catch (error) {
    reply.status(403).send({ message: "Invalid or expire token" });
  }
};
