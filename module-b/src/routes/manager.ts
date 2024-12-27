import express, { type Router } from "express";
import { StatusCodes } from "http-status-codes";
import { idGenerator } from "../lib/utils/unique.js";
import { authenticateToken } from "../middleware/auth.js";
import { users } from "../models/user.js";
import { workShifts } from "../models/workshift.js";

const router: Router = express.Router();
router.post(
  "/work-shift/:id/client-requests",
  authenticateToken("manager"),
  (req, res) => {
    const { id } = req.params;
    const workshift = workShifts.get(id);
    if (!workshift) {
      res.status(StatusCodes.NOT_FOUND).json({
        message: "Not found",
      });
      return;
    }
    const { description } = req.body;
    if (!description) {
      res.status(StatusCodes.BAD_REQUEST).json({
        message: "No description provided",
      });
      return;
    }
    const clientRequests = workshift.clientRequests;
    const requestId = idGenerator.getId("request");
    clientRequests.set(String(requestId), {
      id: requestId,
      description,
      assigneeId: null,
      status: "idle",
    });
    res.status(StatusCodes.OK).json({
      message: "Successfully added new client request",
    });
  },
);
router.post(
  "/work-shift/:workshiftId/client-request/:requestId/user",
  authenticateToken("manager"),
  (req, res) => {
    const { workshiftId, requestId } = req.params;
    const workshift = workShifts.get(workshiftId);
    if (!workshift) {
      res.status(StatusCodes.NOT_FOUND).json({
        message: "Not found",
      });
      return;
    }
    const { clientRequests } = workshift;
    const { userId } = req.body;
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
  "/work-shift/:workshiftId/client-request/:requestId/user",
  authenticateToken("manager"),
  (req, res) => {
    const { workshiftId, requestId } = req.params;
    const workshift = workShifts.get(workshiftId);
    if (!workshift) {
      res.status(StatusCodes.NOT_FOUND).json({
        message: "Not found",
      });
      return;
    }
    const { clientRequests } = workshift;
    const { userId } = req.body;
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
      message: "Successfully reassigned the task",
    });
  },
);
