import express from "express";
import favoritesRouter from "./routes/favorites";

const app = express();
const port = 4000;

app.use(express.static("public"));
app.use(express.json());
app.use("/favorites", favoritesRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
