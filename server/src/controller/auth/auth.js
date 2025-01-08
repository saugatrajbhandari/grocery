import { DeliveryPartner, Customer, Admin } from "../../models/user.js";
import jwt from "jsonwebtoken";

const generateTokens = (user) => {
  const accessToken = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.TOKEN_SECRET,
    { expiresIn: "1d" }
  );

  const refreshToken = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "1d" }
  );

  return { refreshToken, accessToken };
};

export const loginCustomer = async (req, reply) => {
  try {
    const { phone } = req.body;

    let customer = await Customer.findOne({ phone });

    if (!customer) {
      customer = new Customer({
        phone,
        role: "Customer",
        isActivated: true,
      });
    }

    await customer.save();

    const { accessToken, refreshToken } = generateTokens(customer);

    return reply.status(200).send({
      message: "Login successful",
      accessToken,
      refreshToken,
      customer,
    });
  } catch (error) {
    return reply.status(500).send({ message: "Error occured", error });
  }
};

export const loginDeliveryPartner = async (req, reply) => {
  try {
    const { email, password } = req.body;

    let deliveryPartner = await DeliveryPartner.findOne({ email });

    if (!deliveryPartner) {
      return reply.status(404).send({ message: "Delivery Partner not found" });
    }

    const isMatch = password === deliveryPartner.password;

    if (!isMatch) {
      return reply.status(400).send({ message: "Invalid password" });
    }

    deliveryPartner = new DeliveryPartner({
      phone,
      role: "DeliveryPartner",
      isActivated: true,
    });

    await deliveryPartner.save();

    const { accessToken, refreshToken } = generateTokens(deliveryPartner);

    return reply.status(200).send({
      message: "Delivery Login successful",
      accessToken,
      refreshToken,
      deliveryPartner,
    });
  } catch (error) {
    return reply.status(500).send({ message: "Error occured", error });
  }
};

export const createCustomer = async (req, reply) => {
  try {
    const { name, phoneNumber, address } = req.body;

    const customer = new Customer({
      name,
      phoneNumber,
      address,
      isActivated: true,
    });

    await customer.save();

    return reply.status(201).send({
      message: "Customer created successfully",
      customer,
    });
  } catch (error) {
    return reply
      .status(500)
      .send({ message: "Error creating customer", error });
  }
};

export const createDeliveryPartner = async (req, reply) => {
  try {
    const { name, email, password, phoneNumber, branch } = req.body;

    const deliveryPartner = new DeliveryPartner({
      name,
      email,
      password,
      phoneNumber,
      branch,
      isActivated: true,
    });

    await deliveryPartner.save();

    return reply.status(201).send({
      message: "Delivery Partner created successfully",
      deliveryPartner,
    });
  } catch (error) {
    return reply
      .status(500)
      .send({ message: "Error creating delivery partner", error });
  }
};

export const createAdmin = async (req, reply) => {
  try {
    const { name, email, password } = req.body;

    const admin = new Admin({
      name,
      email,
      password,
      isActivated: true,
    });

    await admin.save();

    return reply.status(201).send({
      message: "Admin created successfully",
      admin,
    });
  } catch (error) {
    return reply.status(500).send({ message: "Error creating admin", error });
  }
};

export const fetchUser = async (req, reply) => {
  try {
    const { userId, role } = req.user;

    let user;

    if (role === "Customer") {
      const customer = await Customer.findById(userId);

      return reply
        .status(200)
        .send({ message: "Operation Succeed", data: customer });
    } else if (role === "DeliveryPartner") {
      const deliveryPartner = await DeliveryPartner.findById(userId);
      return reply
        .status(200)
        .send({ message: "Operation Succeed", data: deliveryPartner });
    }

    return reply.status(400).send({ message: "Something went wrong" });
  } catch (error) {
    return reply.status(500).send({ message: "Error while fetching user" });
  }
};
