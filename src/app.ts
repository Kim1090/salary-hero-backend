import express, { Application, Request, Response, NextFunction } from "express";

const app: Application = express();

app.use(express.json());

app.use("/", (req: Request, res: Response, next: NextFunction) => {
  const message = "welcome to the application";
  res.json({ message });
});

export default app;
