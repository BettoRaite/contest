import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  dialect: 'mysql',
  dbCredentials: {
    url: 'mysql://bettoraite:0UrRPPkJOhN%Edv@localhost:3306/dumbapi'
  }
});
