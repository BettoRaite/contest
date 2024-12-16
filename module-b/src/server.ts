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
import { StatusCodes } from "http-status-codes";

const app = express();
const PORT = 3000;
const SECRET_KEY = "no_secret_key";
const SALT = 10;
const BEARER_TOKEN_NAME = "bearer-token";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.set("views", "./src/views");
app.set("view engine", "ejs");

app.get("", (req, res) => {
  res.redirect("/register");
});
app.get("/register", async (req, res) => {
  res.render("register");
});
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(401).json({ message: `Invalid data ${username} ${password}` });
    return;
  }
  const hashedPassword = await bcrypt.hash(password, SALT);
  const newUser: User = {
    id: users.length + 1,
    username,
    password: hashedPassword,
  };
  users.push(newUser);
  res
    .status(StatusCodes.OK)
    .json({ message: "User registered successfully.", nextUrl: "/login" });
});

app.get("/login", async (req, res) => {
  res.render("login");
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);

  if (!user) {
    res.status(401).json({ message: "Invalid credentials" });
    return;
  }
  const arePasswordsMatching = await bcrypt.compare(password, user.password);
  if (!arePasswordsMatching) {
    res.status(401).json({ message: "Invalid credentials" });
    return;
  }

  const token = jwt.sign({ id: user.id }, SECRET_KEY, {
    expiresIn: "1h",
  });

  res
    .status(StatusCodes.OK)
    .cookie(BEARER_TOKEN_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600000,
    })
    .json({ message: "User registered successfully.", nextUrl: "/profile" });
});

// Middleware to protect routes
const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const token: string = req.cookies[BEARER_TOKEN_NAME];
  const { id } = jwt.verify(token, SECRET_KEY) as { id: number };
  if (!Number.isFinite(id)) {
    res.status(401).json({ message: "User not authorized" });
  }
  req.body.user = users.find((u) => {
    return u.id === id;
  });
  next();
};

// Protected route example
app.get("/profile", authenticateToken, (req: Request, res: Response) => {
  const user = req.body.user;
  console.log(req.body);
  res.render("profile", { username: user.username });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
