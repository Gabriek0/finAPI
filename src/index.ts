import express, { Request, Response, Express, NextFunction } from "express";
import dotenv from "dotenv";

import { v4 as uuid } from "uuid";

import { Account } from "./models/Accounts";

declare module "express-serve-static-core" {
  interface Request {
    customer: {
      id: string;
      name: string;
      cpf: string;
      statement?: {
        description: string;
        created_at: Date;
        amount: number;
        type: string;
      }[];
    };
  }
}

dotenv.config();

const app: Express = express();

app.use(express.json());

const port = process.env.PORT;

const customers: Account[] = [];

function verifyIfCpfAlreadyExists(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { cpf } = req.headers;

  const customer = customers.find((customer) => customer.cpf === cpf);

  if (!customer) {
    return res.status(400).json({ error: "Customer not found." });
  }

  req.customer = customer;

  return next();
}

app.post("/account", (req: Request, res: Response) => {
  const { cpf, name } = req.body;

  const cpfAlreadyExists = customers.some((customer) => customer.cpf === cpf);

  if (!cpfAlreadyExists) {
    customers.push({
      id: uuid(),
      cpf,
      name,
      statement: [],
    });

    return res.status(201).send("Registered account!");
  }

  return res.status(400).json({ error: "Customer already exists!" });
});

app.get(
  "/statement",
  verifyIfCpfAlreadyExists,
  (req: Request, res: Response) => {
    const { customer } = req;

    return res.json(customer?.statement);
  }
);

app.post(
  "/deposit",
  verifyIfCpfAlreadyExists,
  (req: Request, res: Response) => {
    const { description, amount } = req.body;

    const { customer } = req;

    const statementOperation = {
      description,
      amount,
      created_at: new Date(),
      type: "credit",
    };

    customer.statement && customer.statement.push(statementOperation);

    return res.status(201).send();
  }
);

app.listen(port);
