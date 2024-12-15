// server.ts
import express, {
  type Request,
  type Response,
  type NextFunction,
} from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { type User, users } from "./models/user.js";
import { SelectionRange } from "typescript";
import cookieParser from "cookie-parser";
import { getJWT } from "./utils.js";
const app = express();
const PORT = 3000;
const SECRET_KEY = "no_secret_key";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.set("views", "./src/views");
app.set("view engine", "ejs");

app.get("", (req, res) => {
  res.redirect("/register");
});
app.get("/register", async (req, res) => {
  res.render("index");
});
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(401).json({ message: `Invalid data ${username} ${password}` });
    return;
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser: User = {
    id: users.length + 1,
    username,
    password: hashedPassword,
  };
  users.push(newUser);
  const token = getJWT(newUser.id);
  console.log(newUser);
  res
    .status(200)
    .cookie("token", token, {
      maxAge: 24 * 60 * 60 * 1000,
    })
    .json({
      message: "Signup successful",
      token,
    });
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);

  if (!user) {
    res.status(401).json({ message: "Invalid credentials" });
    return;
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    res.status(401).json({ message: "Invalid credentials" });
    return;
  }

  const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, {
    expiresIn: "1h",
  });
  res.json({ token });
});

// Middleware to protect routes
const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  let token: string;
  if (req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  } else {
    res.status(401).json({ message: "User not authorized" });
    return;
  }
  const { id } = jwt.verify(token, SECRET_KEY) as { id: number };
  req.userId = users[id];
  next();
};

// Protected route example
app.get("/protected", authenticateJWT, (req: Request, res: Response) => {
  const user = users[req.userId];
  res.json({ message: "This is a protected route", user });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
