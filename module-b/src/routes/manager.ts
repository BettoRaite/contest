
import express, { type Router } from "express";
import { StatusCodes } from "http-status-codes";
import { idGenerator } from "../lib/utils/unique.js";
import { authenticateToken } from "../middleware/auth.js";
import { clientRequests } from "../models/clientRequests.js";
import { users } from "../models/user.js";

const router: Router = express.Router();
router.post("/client-request", authenticateToken("manager"), (req, res) => {
  const { description } = req.body;
  if (!description) {
    res.status(StatusCodes.BAD_REQUEST).json({
      message: "No description provided",
    });
    return;
  }
  const id = idGenerator.getId("request");
  clientRequests.set(String(id), {
    id,
    description,
    assigneeId: null,
    status: "idle",
  });
  res.status(StatusCodes.OK).json({
    message: "Successfully added new client request",
  });
});
router.post(
  "/client-request/:requestId/user",
  authenticateToken("manager"),
  (req, res) => {
    const { userId } = req.body;
    const { requestId } = req.params;
    const user = users.get(userId);
    const request = clientRequests.get(requestId);
    if (!request) {
      res.status(StatusCodes.NOT_FOUND).json({
        message: "client request with such id not found",
      });
      return;
    }
    if (!user) {
      res.status(StatusCodes.NOT_FOUND).json({
        message: "user with such id not found",
      });
      return;
    }
    request.assigneeId = userId;
    res.status(StatusCodes.OK).json({
      message: "Successfully assigned the task",
    });
  },
);
router.delete(
  "/client-request/:requestId/user",
  authenticateToken("manager"),
  (req, res) => {
    const { userId } = req.body;
    const { requestId } = req.params;
    const user = users.get(userId);
    const request = clientRequests.get(requestId);
    if (!request) {
      res.status(StatusCodes.NOT_FOUND).json({
        message: "client request with such id not found",
      });
      return;
    }
    if (!user) {
      res.status(StatusCodes.NOT_FOUND).json({
        message: "user with such id not found",
      });
      return;
    }
    request.assigneeId = null;
    res.status(StatusCodes.OK).json({
      message: "Successfully removed assignee from the task",
    });
  },
);
