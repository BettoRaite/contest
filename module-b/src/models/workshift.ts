import type { clientRequests, ClientRequest } from "./clientRequests.js";
type WorkShift = {
  id: number;
  start: Date;
  end: Date;
  employeeIds: string[];
  status: "open" | "closed" | "not_active";
  clientRequests: Map<string, ClientRequest>;
  createdAt: Date;
};
export const workShifts = new Map<string, WorkShift>();
