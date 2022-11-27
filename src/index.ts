import express, {
  Request,
  Response,
  Express,
  NextFunction,
  response,
} from "express";
import dotenv from "dotenv";

import { v4 as uuid } from "uuid";

import { Account, Statement } from "./models/Accounts";

declare module "express-serve-static-core" {
  interface Request {
    customer: {
      id: string;
      name: string;
      cpf: string;
      statement: Statement[];
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

function getBalance(statement: Statement[]) {
  const balance = statement.reduce((acc, operation) => {
    if (operation.type === "credit") {
      return (acc += operation.amount);
    } else {
      return (acc -= operation.amount);
    }
  }, 0);

  return balance;
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

    const statementOperation: Statement = {
      description,
      amount,
      created_at: new Date(),
      type: "credit",
    };

    customer.statement && customer.statement.push(statementOperation);

    return res.status(201).send();
  }
);

app.post(
  "/withdraw",
  verifyIfCpfAlreadyExists,
  (req: Request, res: Response) => {
    const { amount } = req.body;

    const { customer } = req;

    const balance = getBalance(customer.statement);

    if (balance < amount) {
      return res.status(400).json({ error: "Insufficient funds!" });
    }

    const statementOperation: Statement = {
      amount,
      created_at: new Date(),
      type: "debit",
    };

    customer.statement.push(statementOperation);

    return res.status(200).send();
  }
);

app.get(
  "/statement/date",
  verifyIfCpfAlreadyExists,
  (req: Request, res: Response) => {
    const { customer } = req;

    const { date } = req.query;

    const dateFormat = new Date(date + " 00:00"); // Example 2022-11-26

    const statement = customer.statement.filter(
      (stat) =>
        stat.created_at.toDateString() === new Date(dateFormat).toDateString()
    );

    return res.json(statement);
  }
);

app.put("/account", verifyIfCpfAlreadyExists, (req: Request, res: Response) => {
  const { customer } = req;

  const { name } = req.body;

  customer.name = name;

  return res.status(201).send();
});

app.get("/account", verifyIfCpfAlreadyExists, (req: Request, res: Response) => {
  const { customer } = req;

  return res.json({ customer });
});

app.delete(
  "/account",
  verifyIfCpfAlreadyExists,
  (req: Request, res: Response) => {
    const { customer } = req;

    customers.splice(customers.indexOf(customer), 1);

    return res.status(200).json(customers);
  }
);

app.get("/balance", verifyIfCpfAlreadyExists, (req: Request, res: Response) => {
  const { customer } = req;

  const balance = getBalance(customer.statement);

  return res.status(200).json({ balance });
});

app.listen(port);
