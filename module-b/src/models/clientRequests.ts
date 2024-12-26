type ClientRequest = {
  id: number;
  description: string;
  assigneeId: number | null;
  status: "active" | "idle" | "complete";
};
export const clientRequests = new Map<string, ClientRequest>();
