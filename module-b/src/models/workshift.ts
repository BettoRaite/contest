type WorkShift = {
  id: number;
  start: Date;
  end: Date;
  employeeIds: string[];
  status: "open" | "closed" | "not_active";
};
export const workShifts = new Map<string, WorkShift>();
