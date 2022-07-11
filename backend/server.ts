import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import { errorHandler, notFound } from "./middleware/errorMiddleware";
import expressAsyncHandler from "express-async-handler";
const User = require("./models/userModels");

const apiRoutes = require("./routes/apiRoutes");

const app = express();

dotenv.config();

connectDB();

app.use(express.json({ limit: "100mb" }));

const PORT = process.env.PORT || 8000;

app.use(
  "/users",
  expressAsyncHandler(async (req: any, res: any) => {
    const keyword = req.query.search
      ? {
          $or: [
            { name: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } },
          ],
        }
      : {};

    const users = await User.find(keyword);
    res.status(200).json(users);
  })
);
app.use("/api", apiRoutes);

app.use(notFound);
app.use(errorHandler);

const server = app.listen(PORT, () =>
  console.log(`Server listening on http://localhost:${PORT} 👌👌😍`)
);
