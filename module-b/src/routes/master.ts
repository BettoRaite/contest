import express, { type Router } from "express";
import { StatusCodes } from "http-status-codes";
import { idGenerator } from "../lib/utils/unique.js";
import { authenticateToken } from "../middleware/auth.js";
import { clientRequests } from "../models/clientRequests.js";
import { users } from "../models/user.js";
import { USER_FIELD } from "../middleware/auth.js";
const router: Router = express.Router();

router.get("/client-request", authenticateToken("master"), (req, res) => {
  const user = req.body[USER_FIELD];

  const pendingTasks = Array.from(clientRequests.entries())
    .filter(([key, request]) => {
      return request.id === user.id;
    })
    .map(([key, r]) => {
      return r;
    });

  res.status(StatusCodes.OK).json({
    message: "Pending tasks retrieved successfully.",
    data: {
      pendingTasks,
    },
  });
});

router.get(
  "/client-request/:requestId",
  authenticateToken("master"),
  (req, res) => {
    const { requestId } = req.params;
    const { status } = req.body;
    const user = req.body[USER_FIELD];
    const request = clientRequests.get(requestId);

    if (!request) {
      res.status(StatusCodes.NOT_FOUND).json({
        message: "Client request with such ID not found.",
      });
      return;
    }
    request.status = status;
    res.status(StatusCodes.OK).json({
      message: "Client request retrieved successfully.",
    });
  },
);
