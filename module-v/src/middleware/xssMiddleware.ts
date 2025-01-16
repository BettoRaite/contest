import { sanitize } from '../utils/sanitize.util';
import type { ExpressMiddleware, SanitizeOptions } from '../types/types';

export const xssMiddleware = (options?: SanitizeOptions): ExpressMiddleware => {
  return (req, _res, next) => {
    req.body = sanitize(req.body, options);
    req.query = sanitize(req.query, options);
    req.params = sanitize(req.params, options);
    next();
  };
};
