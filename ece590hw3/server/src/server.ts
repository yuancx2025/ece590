import cors from "cors";
import express from "express";
import favoritesRouter from "./routes/favorites";

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());
app.use("/favorites", favoritesRouter);

app.listen(port, () => {
  console.log(`Favorites API listening on port ${port}`);
});
