import express, { Request, Response } from "express";
import authRoute from "./auth";
import taskRouter from "./tasks";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));

app.use("/auth", authRoute);
app.use("/task", taskRouter);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Hello from the server",
  });
});

const port = 8080;
app.listen(port, () => {
  console.log(`Server running on: http://localhost:${port}`);
});
