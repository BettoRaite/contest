import express, { type Router } from "express";
import { StatusCodes } from "http-status-codes";
import multer from "multer";
import type { ApiResponse } from "../lib/definition.js";
import { idGenerator } from "../lib/utils/unique.js";
import { authenticateToken } from "../middleware/auth.js";
import { users, type User } from "../models/user.js";
import { workShifts } from "../models/workshift.js";

const upload = multer({ dest: "./public/data/uploads/" });
const router: Router = express.Router();

router.get("/user", authenticateToken("admin"), (req, res) => {
  res.status(StatusCodes.OK).json({
    message: "",
    data: { stuff: users },
  } as ApiResponse);
});

router.post(
  "/user",
  authenticateToken("admin"),
  upload.single("photo"),
  (req, res) => {
    const { login, password, role_id, name, photo } = req.body;
    const id = idGenerator.getId("user");
    users.set(String(id), {
      id: idGenerator.getId("user"),
      login,
      name,
      password,
      roleId: role_id,
      photo: req.file,
    });

    res.status(StatusCodes.OK).json({
      message: "Successfully create new user",
    });
  },
);

router.post("/user/:id", authenticateToken("admin"), (req, res) => {
  const { id } = req.params;
  const user = users.get(id);
  if (!user) {
    res.status(StatusCodes.NOT_FOUND).json({
      message: "User not found",
    });
    return;
  }
  res.status(StatusCodes.OK).json({
    message: "",
    data: {
      user,
    },
  });
});

router.post("/user/:id/to-dismiss", authenticateToken("admin"), (req, res) => {
  const { id } = req.params;

  let user: User | undefined;
  for (const [key, u] of users.entries()) {
    if (String(u.id) === id) {
      user = u;
    }
  }

  if (!user) {
    res.status(StatusCodes.NOT_FOUND).json({
      message: "User not found",
    });
    return;
  }
  users.delete(String(user.id));
  res.status(StatusCodes.OK).json({
    message: "Successfully fired employee!)",
  });
});

router.post("/work-shift", authenticateToken("admin"), (req, res) => {
  const { start, end } = req.body;
  const startTime = new Date(start);
  const endTime = new Date(end);
  if (
    !Number.isFinite(startTime.getTime()) ||
    !Number.isFinite(endTime.getTime())
  ) {
    res.status(StatusCodes.BAD_REQUEST).json({
      message: "invalid time format, failed to parse",
    });
    return;
  }
  const id = idGenerator.getId("work-shift");
  workShifts.set(String(id), {
    id,
    start: startTime,
    end: endTime,
    status: "not_active",
    employeeIds: [],
  });
  res.status(StatusCodes.OK).json({
    message: "Successfully added new shift",
  });
});

router.post("/work-shift/:id/close", authenticateToken("admin"), (req, res) => {
  const { id } = req.params;
  const workshift = workShifts.get(id);
  if (!workshift) {
    res.status(StatusCodes.NOT_FOUND).json({
      message: "Not found",
    });
    return;
  }
  workshift.status = "closed";
  res.status(StatusCodes.OK).json({
    message: `Successfully closed shift with an id of ${id}`,
  });
});

router.post("/work-shift/:id/open", authenticateToken("admin"), (req, res) => {
  const { id } = req.params;
  const workshift = workShifts.get(id);
  if (!workshift) {
    res.status(StatusCodes.NOT_FOUND).json({
      message: "Not found",
    });
    return;
  }
  if (workshift.status === "closed") {
    res.status(StatusCodes.BAD_REQUEST).json({
      message: "Can not reopen an already closed shift",
    });
    return;
  }
  workshift.status = "open";
  res.status(StatusCodes.OK).json({
    message: `Successfully opened shift with an id of ${id}`,
  });
});

router.post("/work-shift/:id/user", authenticateToken("admin"), (req, res) => {
  const { user_id } = req.body;
  const { id } = req.params;
  const workshift = workShifts.get(id);
  const user = users.get(id);
  if (!workshift || !user) {
    res.status(StatusCodes.NOT_FOUND).json({
      message: "Not found",
      data: {
        workshift,
        user,
      },
    });
    return;
  }
  if (workshift.status === "closed") {
    res.status(StatusCodes.BAD_REQUEST).json({
      message: "shift has already been closed, create a new instead",
    });
    return;
  }
  if (workshift.status === "not_active") {
    res.status(StatusCodes.BAD_REQUEST).json({
      message: "shift must be opened first",
    });
    return;
  }
  workshift.employeeIds.push(user_id);
  res.status(StatusCodes.OK).json({
    message: "Successfully assigned employee to shift",
    data: {
      workshift,
    },
  });
});

router.delete(
  "/work-shift/:id/user",
  authenticateToken("admin"),
  (req, res) => {
    const { user_id } = req.body;
    const { id } = req.params;
    const workshift = workShifts.get(id);
    const user = users.get(id);
    if (!workshift || !user) {
      res.status(StatusCodes.NOT_FOUND).json({
        message: "Not found",
        data: {
          workshift,
          user,
        },
      });
      return;
    }
    if (workshift.status === "closed") {
      res.status(StatusCodes.BAD_REQUEST).json({
        message: "shift has already been closed, create a new instead",
      });
      return;
    }
    if (workshift.status === "not_active") {
      res.status(StatusCodes.BAD_REQUEST).json({
        message: "shift must be opened first",
      });
      return;
    }
    const len = workshift.employeeIds.length;
    workshift.employeeIds = workshift.employeeIds.filter(
      (id) => id !== user_id,
    );
    if (workshift.employeeIds.length === len) {
      res.status(StatusCodes.BAD_REQUEST).json({
        message: `employee with ${user_id} has not been assigned to this shift`,
      });
      return;
    }
    res.status(StatusCodes.OK).json({
      message: "Successfully removed employee from shift",
      data: {
        workshift,
      },
    });
  },
);

export default router;
