import cookieParser from "cookie-parser";
import express from "express";
import { PORT } from "./lib/constants.js";
import { joinWithAbsolutePath } from "./lib/utils/path.js";
import router from "./routes/index.js";

const BASE_SEGMENT = "/api-cafe";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(joinWithAbsolutePath("public")));
app.use(cookieParser());
app.set("views", "./src/views");
app.set("view engine", "ejs");
app.get("", (req, res) => {
  res.redirect("/api-cafe");
});
app.use(BASE_SEGMENT, router);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
