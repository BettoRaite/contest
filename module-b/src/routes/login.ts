import express, { type Router } from "express";
import { BEARER_TOKEN_COOKIE } from "../lib/constants.js";
import { StatusCodes } from "http-status-codes";
const loginRoute: Router = express.Router();

loginRoute.post("/login", (req, res) => {
  if (req.cookies[BEARER_TOKEN_COOKIE]) {
  }
  res.status(StatusCodes.OK).render("login");
});

loginRoute.post("/login", (req, res) => {
  if (req.cookies[BEARER_TOKEN_COOKIE]) {
  }
});

export default loginRoute;
