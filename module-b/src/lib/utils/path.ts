import * as os from "node:os";
import * as path from "node:path";

export const joinWithAbsolutePath = (...segments: string[]) => {
  const homeDir = os.homedir();
  const cwd = process.cwd();
  const relativePath = path.relative(homeDir, cwd);
  const fullPath = path.join(homeDir, relativePath);
  return [fullPath, ...segments].join("/");
};
